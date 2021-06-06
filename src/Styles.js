import styled from "styled-components";

export const ContentContainer = styled.div`
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}` : "0.5rem")};
  width: 100%;
`;

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 1em;
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
