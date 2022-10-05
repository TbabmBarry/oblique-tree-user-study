import { useCallback } from 'react';
import "survey-core/modern.min.css";
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { submitSurveyResult } from './api/surveyResults';
import treeDiagram from './assets/section-one.png';
import showdown from 'showdown';

StylesManager.applyTheme('modern');

const surveyJson = {
  pages: [
    {
      elements: [{
          type: "html",
          html: "<h2>Welcome to the ObliqueTreeVis visual analytics system user study!</h2>"
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
    elements: [
      {
        type: "html",
        html: "<h1>Section I</h1>"
      },
      {
        type: "html",
        html: "<h2>Experiment Setup<br></h2><ul><li>Load Houseshoe Crab Data</li><li>Choose Bivariate Decision Tree</li></ul>"
      }
    ]
  },
  {
    elements: [
      {
        "type": "image",
        "name": "tree-diagram",
        "imageLink": treeDiagram,
        "imageWidth": "1280px",
        "imageHeight": "720px"
      },
      {
        type: "text",
        name: "section-one-number-of-leaf-nodes",
        title: "List all the leaf nodes of the prediction class Gigas (Answer with the node number in the diagram, using a comma as a separator).",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "section-one-number-of-leaf-nodes-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
      {
        type: "radiogroup",
        name: "section-one-selection-of-decision-path",
        title: "Which of the following decision paths does not have feature weight involved?",
        isRequired: true,
        choices: [
          "1&rarr;3&rarr;7",
          "1&rarr;2&rarr;5",
          "1&rarr;2&rarr;4&rarr;8",
          "1&rarr;3&rarr;6"
        ]
      },
      {
        type: "radiogroup",
        name: "section-one-selection-of-decision-path-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
    ]
  },
  {
    elements: [
      {
        type: "html",
        html: "<h1>Section II</h1>"
      },
      {
        type: "html",
        html: "<h2>Experiment Setup<br></h2><ul><li>Load Houseshoe Crab Data</li><li>Choose Bivariate Decision Tree</li></ul>"
      }
    ]
  },
  {
    elements: [
      {
        type: "html",
        html: "<h3>Suppose the information and measurements of a houseshoe crab instance A:</h3> \
              <table> \
                <tr> \
                  <th>Feature</th> \
                  <th>Scaled Value</th> \
                  <th>Unscaled Value</th> \
                </tr> \
                <tr> \
                  <td>Temperature</td> \
                  <td>-1.30</td> \
                  <td>-240.75 ℃</td> \
                </tr> \
                <tr> \
                  <td>Weight</td> \
                  <td>1.50</td> \
                  <td>1000.27 g</td> \
                </tr> \
                <tr> \
                  <td>Tail Length</td> \
                  <td>1.54</td> \
                  <td>628.44 mm</td> \
                </tr> \
                <tr> \
                  <td>Altitude</td> \
                  <td>-1.35</td> \
                  <td>-140.53 m</td> \
                </tr> \
                <tr> \
                  <td>Age</td> \
                  <td>1.36</td> \
                  <td>384.91 day</td> \
                </tr> \
              </table>"
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-a",
        title: "What would the model most likely predict for this crab instance A?",
        isRequired: true,
        choices: [
          "Gigas",
          "Rotund",
          "Trident"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-a-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
      {
        type: "checkbox",
        name: "section-two-prediction-of-instance-a-features",
        title: "For the introduced crab instance A, what features are involved in the prediction?",
        isRequired: true,
        hasNone: true,
        choices: [
          "Temperature",
          "Weight",
          "Tail Length",
          "Altitude",
          "Age"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-a-features-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-a-features-importance",
        title: "For the introduced crab instance A, is feature 'Temperature' more important than feature 'Weight'?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-a-features-importance-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
    ]
  },
  {
    elements: [
      {
        type: "html",
        html: "<h2>Here is another houseshoe crab.</h2> \
              <h3>Suppose the information and measurements of a houseshoe crab instance B:</h3> \
              <table> \
                <tr> \
                  <th>Feature</th> \
                  <th>Scaled Value</th> \
                  <th>Unscaled Value</th> \
                </tr> \
                <tr> \
                  <td>Temperature</td> \
                  <td>0.48</td> \
                  <td>-223.06 ℃</td> \
                </tr> \
                <tr> \
                  <td>Weight</td> \
                  <td>0.14</td> \
                  <td>937.37 g</td> \
                </tr> \
                <tr> \
                  <td>Tail Length</td> \
                  <td>0.49</td> \
                  <td>595.23 mm</td> \
                </tr> \
                <tr> \
                  <td>Altitude</td> \
                  <td>-1.43</td> \
                  <td>-141.77 m</td> \
                </tr> \
                <tr> \
                  <td>Age</td> \
                  <td>0.25</td> \
                  <td>365.21 day</td> \
                </tr> \
              </table>"
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-b",
        title: "What would the model most likely predict for this crab instance B?",
        isRequired: true,
        choices: [
          "Gigas",
          "Rotund",
          "Trident"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-b-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
      {
        type: "checkbox",
        name: "section-two-prediction-of-instance-b-features",
        title: "For the introduced crab instance B, what features are involved in the prediction?",
        isRequired: true,
        hasNone: true,
        choices: [
          "Temperature",
          "Weight",
          "Tail Length",
          "Altitude",
          "Age"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-b-features-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-b-features-importance",
        title: "For the introduced crab instance B, is feature 'Tail Length' more important than feature 'Weight'?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "radiogroup",
        name: "section-two-prediction-of-instance-b-features-importance-confidence",
        title:"How confident are you that you provided the correct answer?",
        isRequired: true,
        choices: [
          "Totally not confident",
          "Not confident",
          "Somewhat confident",
          "Confident",
          "Totally confident"
        ]
      },
    ]
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
