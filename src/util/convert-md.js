import DOMPurify from "dompurify"
import { marked } from "marked"
import Prism from "prismjs"

marked.setOptions({
    highlight(code, lang) {
        return Prism.languages[lang]
            ? Prism.highlight(code, Prism.languages[lang], lang)
            : code
    },
})

export function convertMd(data) {
    return DOMPurify.sanitize(
        marked.parse(data.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")),
    )
}