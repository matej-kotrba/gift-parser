"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGIFT = void 0;
function generateGIFT(data) {
    var result = data.map(function (question) {
        if (question.type === "SC") {
            var answers = question.answers.map(function (answer) {
                return answer.isCorrect ? "=[".concat(question.formatter, "]").concat(answer.text) : "~[".concat(question.formatter, "]").concat(answer.text);
            }).join(" ");
            return "::".concat(question.questionName, "::").concat(question.title, "{").concat(answers, "}");
        }
        else if (question.type === "MC") {
            var answerPercentige_1 = (100 / question.answers.filter(function (answer) {
                return answer.isCorrect === true;
            }).length).toFixed(4);
            var answers = question.answers.map(function (answer) {
                return answer.isCorrect ? "~%".concat(answerPercentige_1, "%[").concat(question.formatter, "]").concat(answer.text) : "~[".concat(question.formatter, "]").concat(answer.text);
            }).join(" ");
            return "::".concat(question.questionName, "::").concat(question.title, "{").concat(answers, "}");
        }
        else if (question.type === "SA") {
            var answers = question.answers.map(function (answer) {
                return "=%100%[".concat(question.formatter, "]").concat(answer.text, "#");
            }).join(" ");
            return "::".concat(question.questionName, "::").concat(question.title, "{").concat(answers, "}");
        }
        else if (question.type === "CA") {
            var answers = question.answers.map(function (answer) {
                if (!answer.answerPart || !answer.text)
                    throw new Error("Answer part or text is missing");
                return "=%100%[".concat(question.formatter, "]").concat(answer.text, " -> ").concat(answer.answerPart, "}");
            }).join(" ");
            return "::".concat(question.questionName, "::").concat(question.title, "{").concat(answers, "}");
        }
        else {
            throw new Error("Unknown question type");
        }
    });
    return result.join("\n\n");
}
exports.generateGIFT = generateGIFT;
