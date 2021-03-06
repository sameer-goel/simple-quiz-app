import React, { useEffect, useState } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import { getQuestion } from "../../graphql/queries";
import { QuestionStore } from "../../cache-stores/QuestionStore";

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
} from "react-bootstrap";
import { find as _find } from "underscore";
import ConfirmModal from "../../controls/ConfirmModal";
import AlertError from "../../controls/AlertError";
import { MarkdownViewer } from "../../controls/MarkdownViewer";
import { useHistory } from "react-router-dom";

const ViewQuestion = ({ match }) => {
  const [questionId] = useState(match.params.id);
  const [question, setQuestion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { query } = GraphQlUtil();
  const { deleteQuestion } = QuestionStore();
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      const { data } = await query(getQuestion, {
        id: questionId,
      });
      setQuestion(data.getQuestion);
    };
    load();
  }, [query, questionId]);

  const getAnswerText = (a) => {
    return _find(question.choices, (c) => {
      return c.id === a;
    }).text;
  };

  const onDelete = async () => {
    setErrorMsg(null);
    ConfirmModal({
      onYes: async () => {
        try {
          const result = await deleteQuestion(questionId);
          console.log(result);
          history.push("/questions");
        } catch (e) {
          if (
            e.errors &&
            e.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
          ) {
            setErrorMsg("Can't delete what you didn't create!");
          }
        }
      },
    });
  };

  const renderChoices = () => {
    return (
      <React.Fragment>
        <small>Choices</small>
        <Table responsive="sm" size="sm" bordered={false}>
          <tbody>
            {question.choices.map((c, index) => {
              return (
                <tr key={index}>
                  <td>
                    <MarkdownViewer source={c.text} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  };

  const renderAnswers = () => {
    return (
      <React.Fragment>
        <small>Answers</small>
        <Table responsive="sm" size="sm" bordered={false}>
          <tbody>
            {question.answers.map((a, index) => {
              return (
                <tr key={index}>
                  <td>{getAnswerText(a)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  };

  const renderExplanation = () => {
    if (question) {
      return (
        <React.Fragment>
          <small>Explanation</small>
          <MarkdownViewer source={question.explanation} />
        </React.Fragment>
      );
    }
  };

  const renderQuestion = () => {
    if (!question) {
      return <p>Loading...</p>;
    }
    return (
      <Card>
        <Card.Body>
          <p>
            {question.tags.map((t, index) => {
              return (
                <Badge variant="info" key={index} className="mr-1">
                  {t}
                </Badge>
              );
            })}
          </p>
          <small>Question</small>
          <MarkdownViewer source={question.question} />
          {renderChoices()}
          {renderAnswers()}
          {renderExplanation()}
          {errorMsg && <AlertError errorMsg={errorMsg} title="Error" />}
        </Card.Body>
        <Card.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => history.goBack()}>
            &larr;&nbsp;Back
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="float-right">
            Delete
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <Container>
      <Row>
        <Col>{renderQuestion()}</Col>
      </Row>
    </Container>
  );
};

export default ViewQuestion;
