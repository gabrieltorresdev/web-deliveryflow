<template>
  <div class="flex flex-col gap-2">
    <div v-if="editor" class="flex gap-1">
      <UButton
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        icon="fluent:text-bold-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{ 'bg-gray-100 hover:bg-gray-100': editor.isActive('bold') }"
      />
      <UButton
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        icon="fluent:text-italic-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{ 'bg-gray-100 hover:bg-gray-100': editor.isActive('italic') }"
      />
      <UButton
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        icon="fluent:text-strikethrough-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{ 'bg-gray-100 hover:bg-gray-100': editor.isActive('strike') }"
      />

      <UDivider orientation="vertical" />

      <UButton
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
        icon="fluent:code-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('codeBlock'),
        }"
      />
      <UButton
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        icon="fluent:braces-16-filled"
        square
        variant="ghost"
        color="white"
        :class="{ 'bg-gray-100 hover:bg-gray-100': editor.isActive('code') }"
      />
      <UButton
        @click="editor.chain().focus().toggleBlockquote().run()"
        :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
        icon="fluent:text-quote-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('blockquote'),
        }"
      />

      <UDivider orientation="vertical" />

      <UButton
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :disabled="
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        "
        icon="fluent:text-header-1-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('heading', {
            level: 2,
          }),
        }"
      />
      <UButton
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :disabled="
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        "
        icon="fluent:text-header-2-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('heading', {
            level: 3,
          }),
        }"
      />

      <UDivider orientation="vertical" />

      <UButton
        @click="editor.chain().focus().toggleBulletList().run()"
        :disabled="!editor.can().chain().focus().toggleBulletList().run()"
        icon="fluent:text-bullet-list-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('bulletList'),
        }"
      />
      <UButton
        @click="editor.chain().focus().toggleOrderedList().run()"
        :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
        icon="fluent:text-number-list-24-filled"
        square
        variant="ghost"
        color="white"
        :class="{
          'bg-gray-100 hover:bg-gray-100': editor.isActive('orderedList'),
        }"
      />

      <UDivider orientation="vertical" />

      <UButton
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        icon="fluent:arrow-undo-16-filled"
        square
        size="xs"
        variant="ghost"
        color="white"
      />
      <UButton
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        icon="fluent:arrow-redo-16-filled"
        size="xs"
        square
        variant="ghost"
        color="white"
      />
      <!-- <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button> -->
      <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button> -->
      <!-- <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button> -->
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import type { HtmlEditorProps } from ".";

const props = defineProps<HtmlEditorProps>();

const editor = useEditor({
  content: props.value,
  extensions: [TiptapStarterKit],
  editorProps: {
    attributes: {
      class:
        "prose ring-1 rounded-md bg-gray-50 ring-gray-200 p-4 focus:outline-none focus:ring-primary-500 focus:ring-2 focus:bg-gray-50 hover:bg-gray-100 transition-all min-w-full min-h-full",
    },
  },
});

onBeforeUnmount(() => {
  unref(editor)!.destroy();
});
</script>
