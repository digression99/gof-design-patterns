// add reactive system to manage data changes reactively.

class Editor {
  private text: string;
  private element: HTMLInputElement;

  constructor(element: HTMLInputElement) {
    this.element = element;
    element.addEventListener("change", this.handleChangeText.bind(this));
  }

  handleChangeText(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.text = target.value;
    console.log("[handleChangeText] text : ", this.text);
  }

  onDestory() {
    this.element.removeEventListener(
      "change",
      this.handleChangeText.bind(this)
    );
  }

  public save(): Snapshot {
    console.log("saving... text : ", this.text);
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

    const latestSnapshot = this.snapshots.pop();
    this.editor.restore(latestSnapshot);

    this.showHistory();
  }

  public showHistory(): void {
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
  console.log("dom loaded..");
  const editor = new Editor(document.querySelector("#text-input"));
  const editorHistory = new EditorHistory(
    editor,
    document.getElementById("snapshot-history-list") as HTMLUListElement
  );

  document.getElementById("save-button").addEventListener("click", () => {
    editorHistory.backup();
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    editorHistory.undo();
  });
});
