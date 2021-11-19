import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variantType = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantLookup = {
    "on-sale": {
      color: COLORS.primary,
      label: "Sale",
    },
    "new-release": {
      color: COLORS.secondary,
      label: "Just released!",
    },
    default: null,
  };

  const variant = variantLookup[variantType];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant && (
            <Headline color={variant.color}>{variant.label}</Headline>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variantType === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Headline = styled.p`
  background-color: ${(props) => props.color};
  color: ${COLORS.white};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  position: absolute;
  right: -5px;
  top: 5px;
`;
const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex: 1 1 300px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
  text-decoration: ${(props) => (props.sale ? "line-through" : null)};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  display: inline;
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
