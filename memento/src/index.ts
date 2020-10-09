// add reactive system to manage data changes reactively.
import "normalize.css";

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
    if (this.snapshots.length < 1) return;
    console.log("snapshot exists... : ", this.snapshots);

    const latestSnapshot = this.snapshots.pop();
    this.editor.restore(latestSnapshot);

    this.showHistory();
  }

  public showHistory(): void {
    console.log("show history, snapshots: ", this.snapshots);

    this.snapshotHistoryList.innerHTML = this.snapshots
      .map(
        (snapshot, idx) => `
    <li>Snapshot #${idx + 1} : ${snapshot.getName()}</li>
    `
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = new Editor(
    <HTMLTextAreaElement>document.getElementById("textarea")
  );

  const editorHistory = new EditorHistory(
    editor,
    <HTMLUListElement>document.getElementById("snapshot-history-list")
  );

  document.getElementById("save-button").addEventListener("click", () => {
    editorHistory.backup();
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    editorHistory.undo();
  });
});
