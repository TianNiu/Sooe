import sublime, sublime_plugin
import os, sys, subprocess, codecs, webbrowser

# 存放插件的文件夹
PLUGIN_FOLDER = os.path.dirname(os.path.realpath(__file__))
TEMP_FILE_PATH = PLUGIN_FOLDER + "/" + ".__temp__"

class SooeCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    current_file_path = self.view.file_name()
    mode = ''

    def on_input_panel_done(dest):
      # 获得文件内容
      entire_buffer_region = sublime.Region(0, self.view.size())

      # 把内容保存到临时文件
      self.save_buffer_to_temp_file(entire_buffer_region)

      # 用node 处理临时文件并返回结果
      output = self.run_script_on_file(current_file_path, dest, mode).strip()

      print(output)

      # 删除临时文件
      os.remove(TEMP_FILE_PATH)

      # 打开处理过的文件
      self.view.window().open_file(output)

    def on_quick_panel_done(select):
      mode = str(select)

      # 显示目标文件输入框
      self.view.window().show_input_panel("文件名", "", on_input_panel_done, None, None)


    # 显示选择框
    self.view.window().show_quick_panel(["普通页头", "6_页头"], on_quick_panel_done,)





  def run_script_on_file(self, current_file_path, dest, mode):
    node_path = PluginUtils.get_node_path()
    script_path = PLUGIN_FOLDER + "/scripts/app.js"
    cmd = [node_path, script_path, '--temp_file_path=' + TEMP_FILE_PATH, '--current_file_path=' + current_file_path, '--dest=' + dest, '--mode=' + mode]
    output = PluginUtils.get_output(cmd)
    return output.decode(encoding='UTF-8')

  def save_buffer_to_temp_file(self, region):
    buffer_text = self.view.substr(region)
    f = codecs.open(TEMP_FILE_PATH, mode="w", encoding="utf-8")
    f.write(buffer_text)
    f.close()


class PluginUtils:
  @staticmethod
  def get_pref(key):
    return sublime.load_settings(SETTINGS_FILE).get(key)

  @staticmethod
  def open_config_rc(window):
    window.open_file(PLUGIN_FOLDER + "/" + RC_FILE)

  @staticmethod
  def open_sublime_settings(window):
    window.open_file(PLUGIN_FOLDER + "/" + SETTINGS_FILE)

  @staticmethod
  def open_sublime_keymap(window, platform):
    window.open_file(PLUGIN_FOLDER + "/" + KEYMAP_FILE.replace("$PLATFORM", platform))

  @staticmethod
  def exists_in_path(cmd):
    # Can't search the path if a directory is specified.
    assert not os.path.dirname(cmd)
    path = os.environ.get("PATH", "").split(os.pathsep)
    extensions = os.environ.get("PATHEXT", "").split(os.pathsep)

    # For each directory in PATH, check if it contains the specified binary.
    for directory in path:
      base = os.path.join(directory, cmd)
      options = [base] + [(base + ext) for ext in extensions]
      for filename in options:
        if os.path.exists(filename):
          return True

    return False

  @staticmethod
  def get_node_path():
    # Simply using `node` without specifying a path sometimes doesn't work :(
    if PluginUtils.exists_in_path("nodejs"):
      return "nodejs"
    elif PluginUtils.exists_in_path("node"):
      return "node"
    else:
      platform = sublime.platform()
      node = PluginUtils.get_pref("node_path").get(platform)
      print("Using node.js path on '" + platform + "': " + node)
      return node

  @staticmethod
  def get_output(cmd):
    if int(sublime.version()) < 3000:
      if sublime.platform() != "windows":
        # Handle Linux and OS X in Python 2.
        run = '"' + '" "'.join(cmd) + '"'
        return commands.getoutput(run)
      else:
        # Handle Windows in Python 2.
        # Prevent console window from showing.
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        return subprocess.Popen(cmd, \
          stdout=subprocess.PIPE, \
          startupinfo=startupinfo).communicate()[0]
    else:
      # Handle all OS in Python 3.
      run = '"' + '" "'.join(cmd) + '"'
      return subprocess.check_output(run, stderr=subprocess.STDOUT, shell=True, env=os.environ)