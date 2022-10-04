import { useCallback } from 'react';
import "survey-core/modern.min.css";
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { submitSurveyResult } from './api/surveyResults';
import showdown from 'showdown';

StylesManager.applyTheme('modern');

const surveyJson = {
  pages: [
    {
      elements: [{
          type: "html",
          html: "<h2>In this survey, we will ask you a couple questions about...</h2>"
      }]
  },
  {
    elements: [{
        type: "text",
        name: "user-id",
        title: "What is your user id?",
        isRequired: true
    }]
  },
  {
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
},
{
  elements: [
    {
      type: "html",
      html: "<h1>Post-experiment Questionnaire</h1>"
    },
    {
    type: "rating",
    name: "visualization-interpretability",
    title: "Do you find this visualization useful for understanding the behavior of an oblique decision tree?",
    minRateDescription: "Not useful",
    maxRateDescription: "Very useful",
    isRequired: true
  },
  {
    type: "rating",
    name: "visualization-usability",
    title: "Do you think this visualization easy to use?",
    minRateDescription: "Very hard",
    maxRateDescription: "Very easy",
    isRequired: true
  },
  {
    type: "matrix",
    name: "components-usability",
    title: "Please evaluate the ease of use of the different components of the system.",
    columns: [
      {
        "value": 1,
        "text": "Not<br>useful<br>1"
      },
      {
        "value": 2,
        "text": "<br><br>2"
      },
      {
        "value": 3,
        "text": "<br><br>3"
      },
      {
        "value": 4,
        "text": "<br><br>4"
      }, {
        "value": 5,
        "text": "Very<br>useful<br>5"
      }
    ],
    rows: [
      {
        "value": "oblique-tree-view",
        "text": "*Oblique Tree View*"
      },
      {
        "value": "feature-view",
        "text": "*Feature View*"
      },
      {
        "value": "projection-view",
        "text": "*Projection View*"
      }
    ],
    isRequired: true
  }
]
},
// {
//   elements: [{
//     type: "rating",
//     name: "visualization-usability",
//     title: "Do you think this visualization easy to use?",
//     minRateDescription: "Very hard",
//     maxRateDescription: "Very easy"
//   }]
// },
// {
//   elements: [{
//     type: "matrix",
//     name: "components-usability",
//     title: "Please evaluate the ease of use of the different components of the system.",
//     columns: [
//       {
//         "value": 1,
//         "text": "Not<br>useful<br>1"
//       },
//       {
//         "value": 2,
//         "text": "<br><br>2"
//       },
//       {
//         "value": 3,
//         "text": "<br><br>3"
//       },
//       {
//         "value": 4,
//         "text": "<br><br>4"
//       }, {
//         "value": 5,
//         "text": "Very<br>useful<br>5"
//       }
//     ],
//     rows: [
//       {
//         "value": "oblique-tree-view",
//         "text": "*Oblique Tree View*"
//       },
//       {
//         "value": "feature-view",
//         "text": "*Feature View*"
//       },
//       {
//         "value": "projection-view",
//         "text": "*Projection View*"
//       }
//     ],
//     isRequired: true
//   }],
  // }
]
};

function App() {
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;
  const converter = new showdown.Converter();

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

  survey.onTextMarkdown.add((survey, options) => {
    // Convert Markdown to HTML
    let str = converter.makeHtml(options.text);
    // Remove root paragraphs <p></p>
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    // Set HTML markup to render
    options.html = str;
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
