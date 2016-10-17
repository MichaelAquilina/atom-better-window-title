'use babel';

export default {

  change_disposable: null,

  activate(state) {
    this.change_disposable = atom.workspace.onDidChangeActivePaneItem(this.set_window_title);
    this.set_window_title();
  },

  deactivate() {
    if (this.change_disposable != null) {
      this.change_disposable.dispose();
      this.change_disposable = null;
    }
  },

  set_window_title() {
    let window = atom.getCurrentWindow();
    let editor = atom.workspace.getActiveTextEditor();

    let window_title = 'Atom';

    if (editor) {
      window_title += ' -';

      let output = atom.project.relativizePath(editor.getPath());

      let project_path = '';
      if (output[0] != null) {
          project_path = output[0].split('/');
          project_path = project_path[project_path.length - 1];
          window_title += ` (${project_path})`;
      }

      let relative_path = output[1];
      window_title += ` ${relative_path}`;
    }

    window.setTitle(window_title);
  }
};
