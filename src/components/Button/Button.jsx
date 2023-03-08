import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';


export function Button({ onClick }) {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more 
    </StyledButton>
  );
}

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};