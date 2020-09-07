interface AppState {
  editorText: string;
  clipboard: string;
}

interface Command {
  execute: (state: AppState) => AppState;
  undo: (oldState: AppState) => AppState;
}

type CommandFactory = (options?: { [key: string]: any }) => Command;

const createCommandManager = (initialState) => {
  const commandQueue = [];
  const historyStack = [];
  let currentState = { ...initialState };

  const push = (command) => {
    commandQueue.push(command);
  };

  const executeCommand = () => {
    if (commandQueue.length === 0) {
      console.log("No command exists.");
      return false;
    }

    const command = commandQueue.shift();

    if (command instanceof UndoCommand) {
      undo();
      return true;
    }

    const nextState = command.execute(currentState);

    historyStack.push(currentState);
    currentState = { ...currentState, ...nextState };
    console.log("Current state : ", currentState);
    return true;
  };

  const run = () => {
    const handler = () => {
      const res = executeCommand();
      if (res) run();
    };

    setTimeout(handler, 1000);
  };

  const getState = () => currentState;

  const undo = () => {
    const oldState = historyStack.pop();
    currentState = { ...oldState };
    console.log("undoed state : ", currentState);
  };

  run();

  return {
    push,
    executeCommand,
    getState,
    undo,
  };
};

class CopyCommand implements Command {
  constructor(public text: string) {}

  execute(state) {
    console.log(`Copy command executed, copy text : ${this.text}`);

    return {
      ...state,
      clipboard: this.text,
    };
  }

  undo(state) {
    return state;
  }
}

class PasteCommand implements Command {
  constructor(public text: string) {}

  execute(state) {
    console.log("[PasteCommand] state : ", state);
    console.log(`Paste command executed, pasteText : ${this.text}`);

    return {
      ...state,
      editorText: state.editorText.concat(this.text),
    };
  }

  undo(oldState) {
    return {
      ...oldState,
      editorText: oldState.editorText,
    };
  }
}

class UndoCommand implements Command {
  execute(state) {
    return state;
  }
  undo(state) {
    return state;
  }
}

const Button = ({ text, onClick }) => {
  const width = 100;
  const height = 100;

  const handleClick = () => {
    console.log(`Button ${text} clicked.`);
    onClick("Current button text...");
  };

  return {
    handleClick,
    width,
    height,
    text,
  };
};

const Toolbar = ({ title, onSelected }) => {
  return {
    handleSelect: () => {
      console.log(`Toolbar ${title} selected.`);
      onSelected("Current toolbar text...");
    },
  };
};

const client = () => {
  const initialState = {
    clipboard: "",
    editorText: "",
  };

  const commandManager = createCommandManager(initialState);

  const CopyButton = Button({
    text: "Copy button",
    onClick: (text) => {
      commandManager.push(new CopyCommand(text));
    },
  });

  CopyButton.handleClick();

  const PasteButton = Button({
    text: "Paste Button",
    onClick: (text) => {
      commandManager.push(new PasteCommand(text));
    },
  });

  PasteButton.handleClick();
  PasteButton.handleClick();

  console.log("---------------");

  const CopyToolbar = Toolbar({
    title: "Copy",
    onSelected: (text) => commandManager.push(new CopyCommand(text)),
  });

  CopyToolbar.handleSelect();

  const PasteToolbar = Toolbar({
    title: "Paste",
    onSelected: (text) => commandManager.push(new PasteCommand(text)),
  });

  PasteToolbar.handleSelect();

  commandManager.push(new UndoCommand());
  commandManager.push(new UndoCommand());
  commandManager.push(new UndoCommand());
  commandManager.push(new UndoCommand());
};

client();
