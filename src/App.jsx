import { useCallback, useState } from 'react'

import "survey-core/modern.min.css"
import { StylesManager, Model } from 'survey-core'
import { Survey } from 'survey-react-ui'

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
        name: "what-would-make-you-more-satisfied",
        title: "What can we do to make your experience more satisfying?",
        type: "comment",
    }, {
        name: "nps-score",
        title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
        type: "rating",
        rateMin: 0,
        rateMax: 10
    }],
}, {
    elements: [{
        name: "how-can-we-improve",
        title: "In your opinion, how could we improve our product?",
        type: "comment"
    }],
}, {
    elements: [{
        name: "disappointing-experience",
        title: "Please let us know why you had such a disappointing experience with our product",
        type: "comment"
    }],
}]
};

function App() {
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  const timeEl = document.getElementById('timeEl');
  let timerId = null;
  const renderTime = (time) => {
    if (!timeEl) return;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = Math.floor(time % 60);
    let timeText = `${hours}:${minutes}:${seconds}`;
    timeEl.innerText = timeText;
  }

  const timerCallback = () => {
    let page = survey.currentPage;
    if (!page) return;
    let valueName = `page-no-${survey.pages.indexOf(page)}-time-spent`;
    let seconds = survey.getValue(valueName);
    if (seconds == null) seconds = 0;
    else seconds++;
    survey.setValue(valueName, seconds);
    renderTime(seconds);
  };

  survey.onCurrentPageChanged.add((sender) => {
    console.log(sender.data);
    timerCallback();
  })

  survey.onComplete.add((sender) => {
    document.getElementById("timeInfo").style.display = "none";
    clearInterval(timerId);
    alertResults(sender);
  });

  timerCallback();
  timerId = window.setInterval(() => {
    timerCallback();
  }, 1000);

  return <div>
    <div id="timeInfo">
      <p>
        <span>The time spent on this question: </span><span id="timeEl"></span>
      </p>
    </div>
    <Survey model={survey} />
  </div>
}

export default App
