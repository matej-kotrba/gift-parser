export type QuestionTypes = "MC" | "SC"

export type Question = {
  questionName: string;
  title: string;
  formatter: "plain";
  type: QuestionTypes;
  answers: {
    text: string;
    isCorrect: boolean;
  }[]
}

export function generateGIFT(data: Question[]) {
  const result = data.map((question) => {
    if (question.type === "SC") {
      const answers = question.answers.map((answer) => {
        return answer.isCorrect ? `=${answer.text}` : `~${answer.text}`
      }).join(" ");
      return `::${question.questionName}::${question.title}{${answers}}`
    }
    else if (question.type === "MC") {
      const answerPercentige = (100 / question.answers.filter((answer) => {
        return answer.isCorrect === true
      }).length).toFixed(4)

      const answers = question.answers.map((answer) => {
        return answer.isCorrect ? `~%${answerPercentige}%${answer.text}` : `~${answer.text}`
      }).join(" ");
      return `::${question.questionName}::${question.title}{${answers}}`
    }
  })
  return result.join("\n\n")
}