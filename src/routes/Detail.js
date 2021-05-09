import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgb(245, 219, 245);
  background: linear-gradient(
    120deg,
    rgba(159, 196, 255, 0.7) 0%,
    rgba(246, 216, 247, 1) 49%,
    rgba(246, 227, 209, 1) 100%
  );
  color: #fff;
`;

const Column = styled.div`
  width: 50%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const SubTitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 24px;
`;

const Poster = styled.div`
  width: 40%;
  height: 60%;
  /* border: 1px solid #fff; */
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Detail = () => {
  let { id } = useParams();

  const { data, loading } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  console.log(data?.suggestions);
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading . . ."
            : `${data.movie.title} ${data.movie.isLiked ? "👑" : "😅"}`}
        </Title>
        <SubTitle>
          {data?.movie?.language} {data?.movie?.rating}
        </SubTitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Detail;
