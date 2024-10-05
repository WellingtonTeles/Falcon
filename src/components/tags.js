import {useState, useEffect, useRef} from 'react';
import styled from "styled-components"

export default function InputTags(props) {
  const {keys, onChangeKeys} = props;
  const [tags, setTags] = useState([...keys])
  // const [tagInput, setTagInput] = useState();
  const tagInput = useRef(null);
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    setTags([...newTags])
    onChangeKeys([...newTags])
  }

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val])
      onChangeKeys([...tags, val]) 
      tagInput.current.value = null;
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <TagWrapper className="input-tag">
      <ul className="input-tag__tags">
        {tags.map((tag, i) => (
          <li key={tag} className='tag-item'>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={tagInput} placeholder='+ Add Email Address' /></li>
      </ul>
    </TagWrapper>
  );
}
const TagWrapper = styled.div`
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;

  .input-tag__tags {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .input-tag__tags li.tag-item {
    // align-items: center;
    // background: #85A3BF;
    // border-radius: 2px;
    // color: white;
    // display: flex;
    // font-weight: 300;
    list-style: none;
    // margin-bottom: 5px;
    // margin-right: 5px;
    // padding: 5px 10px;
    padding: 2px 10px;
    border-radius: 16px;
    text-align: center;
    font-family: Figtree;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    margin-right: 5px;
    margin-bottom: 2px;
    border: 1px solid #CAEBF9;
    background: #E7F7FF;
    color: #007AAB;
  }

  .input-tag__tags li button {
    align-items: center;
    appearance: none;
    border: none;
    background: none;
    color: #007AAB;
    cursor: pointer;
    display: inline-flex;
    font-size: 19px;
    height: 15px;
    justify-content: center;
    line-height: 0;
    margin-left: 8px;
    padding: 0;
    transform: rotate(45deg);
    width: 15px;
  }

  .input-tag__tags li.input-tag__tags__input {
    background: none;
    flex-grow: 1;
    list-style: none;
    padding: 0;
    input {
      border: none!important;
      width: 100%;
      margin-bottom: 0px!important;
      &:focus, &:active {
          border: none!important;
      }
    }
  }
`
