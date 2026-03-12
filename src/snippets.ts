import * as vscode from "vscode";

const c51Snippets = () => {
  const c51IsrHandlerProvider = vscode.languages.registerCompletionItemProvider(
    ["c"],
    {
      provideCompletionItems(doc) {
        if (!doc.fileName.toLowerCase().endsWith(".c")) return undefined;

        const item = new vscode.CompletionItem(
          "isr",
          vscode.CompletionItemKind.Snippet,
        );

        item.insertText = new vscode.SnippetString(
          "void ${1:isr_name}_isr() INTERRUPT(${2:vector}){${3}}",
        );

        item.detail = "Define an interrupt handler";

        return [item];
      },
    },
  );

  const c51InterruptMacroProvider =
    vscode.languages.registerCompletionItemProvider(["c"], {
      provideCompletionItems(doc) {
        if (
          !doc.fileName.toLowerCase().endsWith(".h") &&
          !doc.fileName.toLowerCase().endsWith(".c")
        )
          return undefined;

        const item = new vscode.CompletionItem(
          "INTERRUPT",
          vscode.CompletionItemKind.Snippet,
        );

        item.insertText = new vscode.SnippetString(
          `#ifndef __VSCODE_C51__
#define INTERRUPT(x) interrupt x
#else
#define INTERRUPT(x)
#endif`,
        );

        item.detail = "Define an INTERRUPT macro";

        return [item];
      },
    });

  return [c51IsrHandlerProvider, c51InterruptMacroProvider];
};

export { c51Snippets };
