import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { QuestionStore } from "../../cache-stores/QuestionStore";
import { FilterQuestions } from "../Quizzes/Quiz/FilterQuestions";
import { MarkdownViewer } from "../../controls/MarkdownViewer";

const ListQuestions = ({ history }) => {
  const [allQuestions, setAllQuestions] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const { getAllQuestions } = QuestionStore();
    const load = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
      setAllQuestions(data);
    };
    load();
  }, []);

  const renderQuestion = (q) => {
    return <MarkdownViewer source={q} />;
  };

  const renderTags = (q) => {
    if (q.tags) {
      return q.tags.map((t, index) => {
        return (
          <Badge key={index} variant="light" className="mr-1 mb-1">
            {t}
          </Badge>
        );
      });
    }
  };

  const onQuestionClick = (id) => {
    history.push("/question/view/" + id);
  };

  const renderQuestions = () => {
    if (!questions) {
      return <p>Loading...</p>;
    } else if (questions.length === 0) {
      return <p>No questions to show</p>;
    }
    return (
      <React.Fragment>
        <Table className="table-responsive-sm" size="sm" bordered hover>
          <caption>Showing {questions.length} questions</caption>
          <tbody>
            {questions.map((q, index) => {
              return (
                <tr key={index} onClick={() => onQuestionClick(q.id)}>
                  <td className="clickable">
                    {renderTags(q)}
                    <p>{renderQuestion(q.question)}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  };

  const onFilter = (filtered) => {
    setQuestions(filtered);
  };

  const onFilterReset = () => {
    setQuestions(allQuestions);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>All Questions</span>
              <div className="float-right">
                <Link to="/question/create">+ Question</Link>
              </div>
            </Card.Header>
            <Card.Body>
              <FilterQuestions
                questions={questions}
                onFilter={onFilter}
                onReset={onFilterReset}
              />
              {renderQuestions()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ListQuestions;
