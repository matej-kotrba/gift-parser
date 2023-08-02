export type GIFTQuestionTypes = "MC" | "SC"

export type GIFTQuestion = {
  questionName: string;
  title: string;
  formatter: "plain";
  type: GIFTQuestionTypes;
  answers: {
    text: string;
    isCorrect: boolean;
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
  })
  return result.join("\n\n")
}