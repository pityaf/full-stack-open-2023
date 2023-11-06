const Header = (props) => {
    return(
      <h1>
        { props.name }
      </h1>
    )
  };
  
  const Part = (props) => {
    return (
      <p>
        { props.part.name } { props.part.exercises }
      </p>
    )
    
  }
  
  const Content = (props) => {
    const allContent = props.parts.map(content => <Part key={ content.id } part={ content } />);
    return(
        <div>
            { allContent }
        </div>
    )
  };
  
  const Total = (props) => {
    const sum = props.parts.reduce((acc, currValue) => acc + currValue.exercises, 0);
    return(
      <div>
        <p><strong>Total of { sum } exercises</strong></p>
      </div>
    )
  };

const Course = (props) => {
    return(
        <div>
            <Header name={ props.course.name } />
            <Content parts={ props.course.parts } />
            <Total parts={ props.course.parts } />
        </div>
    )
}

export default Course;