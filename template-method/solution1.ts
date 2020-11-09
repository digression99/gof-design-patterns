const solution1 = () => {
  enum FileType {
    Text,
    PDF,
    Markdown,
    Doc,
  }

  interface File {
    type: FileType;
    content: string;
    name: string;
  }

  interface PDFFile extends File {}
  interface MarkdownFile extends File {}
  interface DocFile extends File {}

  abstract class FileGenerator<Target extends File> {
    public generate(text: string, filePath: string): Target {
      const parsed = this.parse(text);
      this.createFile(filePath);
      this.writeFile(parsed, filePath);
      return parsed;
    }

    protected abstract parse(file: string): Target;

    protected createFile(filePath: string): void {
      console.log(`[FileGenerator] creating file in ${filePath}`);
    }

    protected writeFile(data: Target, filePath: string) {
      console.log(
        `[FileGenerator] writing parsed data ${data.name} to ${filePath}`
      );
    }
  }

  class PDFGenerator extends FileGenerator<PDFFile> {
    protected parse(file: string) {
      return {
        type: FileType.PDF,
        content: `PDF ${file}`,
        name: "PDF file",
      };
    }
  }

  class MarkdownGenerator extends FileGenerator<MarkdownFile> {
    protected parse(file: string) {
      return {
        type: FileType.Markdown,
        content: `Markdown ${file}`,
        name: "Markdown file",
      };
    }
  }

  class DocGenerator extends FileGenerator<DocFile> {
    protected parse(file: string) {
      return {
        type: FileType.Doc,
        content: `Doc ${file}`,
        name: "Doc file",
      };
    }
  }

  const clientCode = () => {
    const filePathPdf = "~/my-files/awesome.pdf";
    const myFileOne = "This is my file one";
    const pdf = new PDFGenerator().generate(myFileOne, filePathPdf);
    console.log("pdf : ", pdf);

    const filePathMarkdown = "~/my-files/awesome.markdown";
    const myFileTwo = "This is my file two";
    const markdown = new MarkdownGenerator().generate(
      myFileTwo,
      filePathMarkdown
    );
    console.log("markdown : ", markdown);

    const filePathDoc = "~/my-files/awesome.doc";
    const myFileThree = "This is my file three";
    const doc = new DocGenerator().generate(myFileThree, filePathDoc);
    console.log("doc : ", doc);
  };

  clientCode();
};

solution1();
