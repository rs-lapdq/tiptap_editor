<template>
  <div v-if="editor" class="d-flex flex-wrap text-editor elevation-3 pa-2">
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleUnderline().run()"
      :disabled="!editor.can().chain().focus().toggleUnderline().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <v-icon>mdi-format-underline</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <v-icon>mdi-format-strikethrough-variant</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      <v-icon>mdi-code-tags</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      <v-icon>mdi-format-quote-open</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="editor.commands.setHighlight({ color: '#ffcc00' })"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      @click="setLink"
      :class="{ 'is-active': editor.isActive('link') }"
      :disabled="!editor.can().chain().focus().toggleLink().run()"
    >
      <v-icon>mdi-link-variant</v-icon>
    </v-btn>
    <v-btn @click="submit">submit</v-btn>
    <editor-content class="editor-content elevation-2" :editor="editor" />
    <div class="content" v-html="content"></div>
    <router-link to="/">Home</router-link>
    <v-card elevation="2" v-if="showSelectLink" class="card-custom">
      <v-select
        v-model="linkSelected"
        :items="items"
        label="Solo field"
        item-text="title"
        item-value="id"
        solo
      ></v-select>
    </v-card>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { RouterLink } from "vue-router";

export default {
  components: {
    EditorContent,
    RouterLink,
  },

  data() {
    return {
      editor: null,
      content: "",
      items: [
        { title: "Foo", id: 1 },
        { title: "Bar", id: 2 },
        { title: "Fizz", id: 3 },
        { title: "Buzz", id: 4 },
      ],
      showSelectLink: false,
      linkSelected: null,
    };
  },

  mounted() {
    console.log(Underline);
    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Document,
        Paragraph,
        Text,
        Highlight,
        Link,
        Underline,
      ],
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },
  watch: {
    linkSelected(nVal) {
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `pick_up_id:${nVal}`, target: "_self" })
        .run();
      this.showSelectLink = false;
    },
  },
  methods: {
    submit() {
      this.content = this.editor.getHTML();
      console.log(this.content);
      this.$nextTick(() => {
        const aTags = document.querySelector(".content  a");
        const values = aTags.getAttribute("href").split(":");
        aTags.addEventListener("click", (e) => {
          e.preventDefault();
          this.$router.push({
            name: "pickup",
            params: {
              id: values[1],
            },
            query: this.$route.query,
          });
        });
      });
    },
    handlerSelectText() {
      console.log(this.editor);
    },
    setLink() {
      this.showSelectLink = true;
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
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style>
.editor-content {
  position: relative;
  width: 100%;
  min-height: 400px;
}
.card-custom {
  position: absolute;
  top: 0;
  left: 0;
}
.text-editor {
  max-width: 700px;
  margin: 20px auto;
}
.ProseMirror {
  height: 100%;
  width: 100%;
}
</style>
