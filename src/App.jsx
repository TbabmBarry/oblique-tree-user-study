import { useCallback, useState } from 'react';
import "survey-core/modern.min.css";
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { submitSurveyResult } from './api/surveyResults';

StylesManager.applyTheme('modern');

const surveyJson = {
  pages: [{
    elements: [{
        name: "satisfaction-score",
        title: "How would you describe your experience with our product?",
        type: "radiogroup",
        choices: [
            { value: 5, text: "Fully satisfying" },
            { value: 4, text: "Generally satisfying" },
            { value: 3, text: "Neutral" },
            { value: 2, text: "Rather unsatisfying" },
            { value: 1, text: "Not satisfying at all" }
        ],
        isRequired: true
    }]
}, {
    elements: [{
        name: "nps-score",
        title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
        type: "rating",
        rateMin: 0,
        rateMax: 10
    }],
}]
};

function App() {
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const submitResults = useCallback((sender) => {
    submitSurveyResult(sender.data).then((res) => {
      console.log("submit survey results: ", res);
    }).catch(function (error) {
        console.log("ERROR: ", error);
    });
  }, []);

  let timerId = null;

  const timerCallback = () => {
    let page = survey.currentPage;
    if (!page) return;
    let valueName = `page-no-${survey.pages.indexOf(page)}-time-spent`;
    let seconds = survey.getValue(valueName);
    if (seconds == null) {
      seconds = 0;
    } else {
      seconds++;
    }
    survey.setValue(valueName, seconds);
  };

  survey.onCurrentPageChanged.add((sender) => {
    timerCallback();
  })

  survey.onComplete.add((sender) => {
    clearInterval(timerId);
    submitResults(sender);
  });

  timerCallback();
  timerId = window.setInterval(() => {
    timerCallback();
  }, 1000);

  return (
    <>
      <Survey model={survey} />
    </>
  )
}

export default App
