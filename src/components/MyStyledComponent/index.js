import styled from 'styled-compnents';

/* Sass Variables 

function calculateRem($size) {
  $remSize: $size / $-base-font-size;
  $remUnit: 1rem;
  @return $remSize * $remUnit;
}
function remToPx($size) {
  let $remUnit = 1rem;
  return ($rem / $remUnit) * $base-font-size;
}

const $base-font-size            15px;
const $base-line-height         : 20px ;
const $base-text-color          : var(--px-base-text-color,  rgb(44,64,76));
const $base-background-color    : var(--px-base-background-color, rgb(255,255,255)) !default;
const $namespace                : null !default;
const $base-spacing-unit        : calculateRem($-base-font-size);
const $base-spacing-unit--tiny  : calculateRem(round($-base-line-height / 4));
const $base-spacing-unit--small : calculateRem(round($-base-line-height / 2));
const $base-spacing-unit--large : calculateRem($-base-line-height);
const $base-spacing-unit--huge  : calculateRem(round($inuit-base-line-height * 1.5));
*/





// TODO - Styled Compnents
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
/*

 <Button>Button</Button>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
    */
export default Button;