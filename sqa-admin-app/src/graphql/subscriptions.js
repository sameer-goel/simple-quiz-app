/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
      id
      question
      type
      choices
      answers
      tags
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
      id
      question
      type
      choices
      answers
      tags
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
      id
      question
      type
      choices
      answers
      tags
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz {
    onCreateQuiz {
      id
      name
      questions
      tags
    }
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz {
    onUpdateQuiz {
      id
      name
      questions
      tags
    }
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz {
    onDeleteQuiz {
      id
      name
      questions
      tags
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      quizzes
      tags
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      quizzes
      tags
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      quizzes
      tags
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      sub
      username
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      sub
      username
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      sub
      username
    }
  }
`;
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse($owner: String) {
    onCreateResponse(owner: $owner) {
      id
      questionId
      userId
      responses
      owner
    }
  }
`;
export const onUpdateResponse = /* GraphQL */ `
  subscription OnUpdateResponse($owner: String) {
    onUpdateResponse(owner: $owner) {
      id
      questionId
      userId
      responses
      owner
    }
  }
`;
export const onDeleteResponse = /* GraphQL */ `
  subscription OnDeleteResponse($owner: String) {
    onDeleteResponse(owner: $owner) {
      id
      questionId
      userId
      responses
      owner
    }
  }
`;