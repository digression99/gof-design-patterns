// add reactive system to manage data changes reactively.
import "normalize.css";
import { of, from, fromEvent, Observable } from "rxjs";
import { filter, tap, reduce, map } from "rxjs/operators";

class Editor {
  private text: string;
  private element: HTMLTextAreaElement;

  constructor(element: HTMLTextAreaElement) {
    this.text = "";
    this.element = element;
    element.addEventListener("change", this.handleChangeText.bind(this));
  }

  handleChangeText(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement;
    this.text = target.value;
  }

  onDestory() {
    this.element.removeEventListener(
      "change",
      this.handleChangeText.bind(this)
    );
  }

  public save(): Snapshot {
    return new EditorSnapshot(this.text);
  }

  public restore(snapshot: Snapshot): void {
    this.text = snapshot.getState();
    this.element.value = this.text;
  }
}

interface Snapshot {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class EditorSnapshot implements Snapshot {
  private state: string;
  private date: string;

  constructor(text: string) {
    this.state = text;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

class EditorHistory {
  private snapshots: Snapshot[];
  private editor: Editor;
  private snapshotHistoryList: HTMLUListElement;

  constructor(editor: Editor, snapshotHistoryList: HTMLUListElement) {
    this.snapshots = [];
    this.editor = editor;
    this.snapshotHistoryList = snapshotHistoryList;
  }

  public backup(): void {
    this.snapshots.push(this.editor.save());
    this.showHistory();
  }

  public undo(): void {
    of(this.snapshots)
      .pipe(
        tap(() => console.log("undo received.")),
        filter((snapshots: Snapshot[]) => snapshots.length >= 1),
        map((snapshots) => snapshots.pop())
      )
      .subscribe((latestSnapshot) => {
        this.editor.restore(latestSnapshot);
        this.showHistory();
      });
  }

  public showHistory(): void {
    from<Snapshot[]>(this.snapshots)
      .pipe(
        map(
          (snapshot: Snapshot, index: number) =>
            `<li>Snapshot #${index + 1} : ${snapshot.getName()}</li>`
        ),
        reduce((acc, cur) => acc.concat(cur), "")
      )
      .subscribe((v) => (this.snapshotHistoryList.innerHTML = v));
  }
}

fromEvent(document, "DOMContentLoaded")
  .pipe(
    map(
      () =>
        [
          <HTMLTextAreaElement>document.getElementById("textarea"),
          <HTMLUListElement>document.getElementById("snapshot-history-list"),
        ] as const
    ),

    map(([editorRef, snapshotHistoryRef]) => {
      const editor = new Editor(editorRef);
      const editorHistory = new EditorHistory(editor, snapshotHistoryRef);
      return { editorHistory };
    })
  )
  .subscribe(({ editorHistory }) => {
    fromEvent(document.getElementById("save-button"), "click").subscribe(() => {
      editorHistory.backup();
    });

    fromEvent(document.getElementById("restore-button"), "click").subscribe(
      () => {
        editorHistory.undo();
      }
    );
  });
