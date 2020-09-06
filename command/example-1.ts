interface AppState {
  editorText: string;
  clipboard: string;
}

interface Command {
  execute: (state: AppState) => void;
}

type CommandFactory = (options?: { [key: string]: any }) => Command;

// Command Queue
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
    const nextState = command.execute(currentState);

    historyStack.push(currentState); // only undo is possible.

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

  run();

  return {
    push,
    executeCommand,
    getState,
  };
};

// commands
const CopyCommand: CommandFactory = ({ state, text }) => {
  const execute = (state) => {
    console.log(`Copy command executed, copy text : ${text}`);

    return {
      clipboard: text,
    };
  };

  return { execute };
};

const PasteCommand: CommandFactory = ({ state, text }) => {
  const execute = (state) => {
    console.log(`Paste command exenuted, pasteText : ${text}`);

    return {
      editorText: state.editorText.concat(text),
    };
  };

  return { execute };
};

// GUIs
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
    onClick: (text) => commandManager.push(CopyCommand({ text })),
  });

  CopyButton.handleClick();

  const PasteButton = Button({
    text: "Paste Button",
    onClick: (text) => commandManager.push(PasteCommand({ text })),
  });

  PasteButton.handleClick();

  console.log("---------------");

  const CopyToolbar = Toolbar({
    title: "Copy",
    onSelected: (text) => commandManager.push(CopyCommand({ text })),
  });

  CopyToolbar.handleSelect();

  const PasteToolbar = Toolbar({
    title: "Paste",
    onSelected: (text) => commandManager.push(PasteCommand({ text })),
  });

  PasteToolbar.handleSelect();
};

client();
