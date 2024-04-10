import { useState } from "react";
import '../../Styles/Components/Faq/FaqItem.css'

const FaqItem = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className="faq-item">
        <div className="faq-item-container">
          <div className="question space" onClick={toggleExpanded}>
            <span>{question}</span>
            <span><img src="Assets/icons/buttons/arrow.png"></img></span>
          </div>
          <div>{expanded && <div className="answer">{answer}</div>}</div>
        </div>
      </div>
    );
  };
  
  export default FaqItem;