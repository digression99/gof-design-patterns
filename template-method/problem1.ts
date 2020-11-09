const problem1 = () => {
  class PDFGenerator {
    generate(file, filePath) {
      const parsed = this.parse(file);
      this.createFile(filePath);
      this.writeFile(parsed, filePath);
    }

    parse(file) {
      console.log("parsing file to PDF.");
    }

    createFile(filePath) {
      console.log("creating pdf file.");
    }

    writeFile(data, filePath) {
      console.log(`writing parsed pdf to ${filePath}`);
    }
  }
  class MarkdownGenerator {
    generate(file, filePath) {
      const parsed = this.parse(file);
      this.createFile(filePath);
      this.writeFile(parsed, filePath);
    }

    parse(file) {
      console.log("parsing file to Markdown.");
    }

    createFile(filePath) {
      console.log("creating pdf file.");
    }

    writeFile(data, filePath) {
      console.log(`writing parsed markdown to ${filePath}`);
    }
  }

  class DocGenerator {
    generate(file, filePath) {
      const parsed = this.parse(file);
      this.createFile(filePath);
      this.writeFile(parsed, filePath);
    }

    parse(file) {
      console.log("parsing file to Doc.");
    }

    createFile(filePath) {
      console.log("creating doc file.");
    }

    writeFile(data, filePath) {
      console.log(`writing parsed doc to ${filePath}`);
    }
  }
};

problem1();
