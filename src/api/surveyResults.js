import request from './axios';

export function submitSurveyResult(data) {
    return request({
        url: '/api/surveyResults',
        method: 'post',
        data,
    });
}