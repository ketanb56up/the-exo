import React, { Component } from "react";
import "./App.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

type Props = {};
type State = {
  question: Question;
  choice: string;
};

type Question = {
  title: string;
  answer_0: string;
  answer_1: string;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      question: {
        title: "",
        answer_0: "",
        answer_1: ""
      },
      choice: ""
    };
  }

  componentDidMount() {
    fetch("/question")
      .then(response => response.json())
      .then(question => {
        this.setState({ question });
      });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      choice: event.target.value
    });
  }

  render() {
    const { question, choice } = this.state;
    const answer = choice ? question[choice as keyof Question] : choice;
    return question ? (
      <Row className="mt-4">
        <Col md={{size: 4, offset:4}}>
          <Card>
            <CardBody>
              <CardTitle>{question.title}</CardTitle>
              <div>
                <FormGroup check>
                  <Label check>
                    <Input
                      value="answer_0"
                      checked={this.state.choice === "answer_0"}
                      onChange={this.handleChange}
                      type="radio"
                      name="choice"
                    />
                    Yes
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      value="answer_1"
                      checked={this.state.choice === "answer_1"}
                      onChange={this.handleChange}
                      type="radio"
                      name="choice"
                    />
                    No
                  </Label>
                </FormGroup>
              </div>
              <CardText>{answer && `Answer: ${answer}`}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    ) : (
      <></>
    );
  }
}

export default App;
