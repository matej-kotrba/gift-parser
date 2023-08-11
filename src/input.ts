export type GIFTQuestionTypes = "MC" | "SC" | "SA" | "CA"

export type GIFTQuestion = {
  questionName: string;
  title: string;
  formatter: "plain";
  type: GIFTQuestionTypes;
  answers: {
    text: string;
    isCorrect?: boolean;
    answerPart?: string;
  }[]
}

export function generateGIFT(data: GIFTQuestion[]) {
  const result = data.map((question) => {
    if (question.type === "SC") {
      const answers = question.answers.map((answer) => {
        return answer.isCorrect ? `=[${question.formatter}]${answer.text}` : `~[${question.formatter}]${answer.text}`
      }).join(" ");
      return `::${question.questionName}::${question.title}{${answers}}`
    }
    else if (question.type === "MC") {
      const answerPercentige = (100 / question.answers.filter((answer) => {
        return answer.isCorrect === true
      }).length).toFixed(4)

      const answers = question.answers.map((answer) => {
        return answer.isCorrect ? `~%${answerPercentige}%[${question.formatter}]${answer.text}` : `~[${question.formatter}]${answer.text}`
      }).join(" ");
      return `::${question.questionName}::${question.title}{${answers}}`
    }
    else if (question.type === "SA") {
      const answers = question.answers.map((answer) => {
        return `=%100%[${question.formatter}]${answer.text}#`
      }).join(" ");
      return `::${question.questionName}::${question.title}{${answers}}`
    }
    else if (question.type === "CA") {
      const answers = question.answers.map(answer => {
        if (!answer.answerPart || !answer.text) throw new Error("Answer part or text is missing")
        return `=${answer.text} -> ${answer.answerPart}`
      }).join(" ")
      return `::${question.questionName}::${question.title}{${answers}}`
    }
    else {
      throw new Error("Unknown question type")
    }
  })
  return result.join("\n\n")
}