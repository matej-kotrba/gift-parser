type GiftString = string
type GiftParseFunction = (giftString: GiftString) => any

type QuestionTypes = "multipleChoice" | "true/false" | "shortAnswer" | "matching" | "missingWord" | "numerical" | "essay"

const tokens = ["//", "::", "=", "~", "#", ""] as const

type ParsedQuestion = {
  questionType: QuestionTypes;
}

type ParsedTest = ParsedQuestion[]

export const parse = (giftString: GiftString) => {

}