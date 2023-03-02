<template>
  <div class="d-flex flex-wrap text-editor elevation-3 pa-2">
    <v-btn color="primary" class="ma-1" @click="submit">
      <v-icon>mdi-link-variant</v-icon>
    </v-btn>
    <div class="setting-link-box">
      <v-btn color="primary" class="ma-1" @click="setLink">
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
      <div
        v-show="showSelectLink"
        class="setting-link-content white elevation-4 pa-2"
        ref="settingLinkContent"
      >
        <div class="d-flex justify-space-between">
          <div class="setting-link-item">
            <v-select
              :items="settingLinkOptions"
              item-text="title"
              item-value="value"
              label="Standard"
              class="link-type"
              attach=".link-type"
              v-model="linkSetting.type"
              @change="handleChangeLinkType"
              hide-details
            ></v-select>
          </div>
          <div class="setting-link-item">
            <v-text-field
              v-model="linkSetting.value"
              v-if="linkSetting.type == 'url'"
              label="URL"
              hide-details
            ></v-text-field>
            <v-select
              v-model="linkSetting.value"
              v-if="linkSetting.type == 'pickup'"
              :items="pickups"
              item-text="title"
              item-value="value"
              label="Standard"
              class="setting-pickup"
              attach=".setting-pickup"
              hide-details
            ></v-select>
            <v-select
              v-model="linkSetting.value"
              v-if="linkSetting.type == 'feature_wall'"
              :items="wallOption"
              item-text="title"
              item-value="value"
              label="Standard"
              class="setting-feature-wall"
              attach=".setting-feature-wall"
              hide-details
            ></v-select>
          </div>
        </div>
        <div class="d-flex justify-space-between">
          <v-btn color="primary" class="ma-1" @click="submitSettingLink">
            OK
          </v-btn>
        </div>
      </div>
    </div>
    <p
      class="editor-content elevation-2"
      contenteditable
      @input="handlerInputEditor"
      @mousedown="getSelectedText"
      ref="textEditor"
    ></p>
  </div>
</template>

<script>
export default {
  props: ["value"],
  components: {},
  data() {
    return {
      editor: null,
      content: "",
      settingLinkOptions: [
        { title: "URL", value: "url" },
        { title: "PICKUP", value: "pickup" },
        { title: "WALL", value: "feature_wall" },
      ],
      pickups: [
        { title: "Pickup 1", value: 1 },
        { title: "Pickup 2", value: 2 },
        { title: "Pickup 3", value: 3 },
        { title: "Pickup 4", value: 4 },
        { title: "Pickup 5", value: 5 },
        { title: "Pickup 6", value: 6 },
        { title: "Pickup 7", value: 7 },
        { title: "Pickup 8", value: 8 },
        { title: "Pickup 9", value: 9 },
      ],
      wallOption: [
        { title: "MEnu", value: "Menu" },
        { title: "Search", value: "Search" },
      ],
      showSelectLink: false,
      linkSelected: null,
      linkSetting: {
        type: "pickup",
        value: "",
      },
      selectedText: "",
      pointerPosition: {
        x: 0,
        y: 0,
      },
    };
  },

  mounted() {},
  methods: {
    submitSettingLink() {
      const aElement = document.createElement("a");
      aElement.href = "https://example.com";
      aElement.textContent = "Link đến trang ví dụ";

      this.showSelectLink = false;
      this.replaceSelectionWithHtml(
        "<a href='https://example.com'> Link đến trang ví dụ</a>"
      );
      this.$emit("input", this.$refs.textEditor.innerHTML);
    },
    handleChangeLinkType() {
      this.linkSetting.value = null;
    },
    handlerInputEditor($event) {
      this.$emit("input", $event.target.innerHTML);
    },
    replaceSelectionWithHtml(html) {
      var range;
      if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        var div = document.createElement("div");
        div.innerHTML = html;
        var frag = document.createDocumentFragment(),
          child;
        while ((child = div.firstChild)) {
          frag.appendChild(child);
        }
        range.insertNode(frag);
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        console.log("🚀 ~ range:", range);
        range.pasteHTML(html);
      }
    },
    setLink() {
      this.showSelectLink = true;
      console.log(this.$refs);
      this.$nextTick(() => {
        console.log([this.$refs.settingLinkContent]);
        this.$refs.settingLinkContent.style.top = `${this.pointerPosition.x}px`;
        this.$refs.settingLinkContent.style.left = `${this.pointerPosition.y}px`;
      });
      console.log(this.pointerPosition);
      // const previousUrl = this.editor.getAttributes("link").href;
      // const url = window.prompt("URL", previousUrl);
      // url = this.linkSelected;
      // cancelled
      // if (url === null) {
      //   return;
      // }

      // // empty
      // if (url === "") {
      //   this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

      //   return;
      // }

      // update link
      // this.editor
      //   .chain()
      //   .focus()
      //   .extendMarkRange("link")
      //   .setLink({ href: url })
      //   .run();
    },
    submit() {
      this.$refs.textEditor.innerText = this.selectedText;
    },
    getSelectedText() {
      this.selectedText = "";

      // window.getSelection
      if (window.getSelection) {
        this.selectedText = window.getSelection();
        if (window.getSelection().rangeCount > 0) {
        const s = window.getSelection();
        const oRange = s && s.getRangeAt(0); //get the text range
        const oRect = oRange.getBoundingClientRect();
        this.pointerPosition = {
          x: oRect.top,
          y: oRect.left,
        };
      }
      }
      // document.getSelection
      else if (document.getSelection) {
        this.selectedText = document.getSelection();
      }
      // document.selection
      else if (document.selection) {
        this.selectedText = document.selection.createRange().text;
      } else return;
    },
  },
};
</script>
<style>
.editor-content {
  position: relative;
  width: 100%;
  min-height: 400px;
  padding: 10px;
  outline: none;
}
.card-custom {
  position: absolute;
  top: 0;
  left: 0;
}
.text-editor {
  max-width: 700px;
  margin: 20px auto;
  padding: 10px;
}
.setting-link-box {
  position: relative;
}
.setting-link-content {
  position: fixed;
  width: 400px;
  z-index: 3;
}
.setting-link-item {
  width: 48%;
}
</style>
