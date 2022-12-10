import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export function LoadMoreBtn({ onClick }) {
  return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
