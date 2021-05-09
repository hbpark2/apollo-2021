import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Movie from "../components/Movie";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
  margin-bottom: 30px;
  background: rgb(245, 219, 245);
  background: linear-gradient(
    120deg,
    rgba(159, 196, 255, 0.7) 0%,
    rgba(246, 216, 247, 1) 49%,
    rgba(246, 227, 209, 1) 100%
  );
`;

const Title = styled.span`
  display: block;
  margin: 0 auto 10px;
  text-align: center;
  font-size: 42px;
  font-weight: 600;
  color: #fff;
`;

const SubTitle = styled.span`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
  color: #fff;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  margin-top: 10px;
  text-align: center;
`;
const Movies = styled.div`
  position: relative;
  top: -150px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 90%;
  margin: 0 auto;
`;

const GET_MOVIES = gql`
  {
    movies {
      id
      title
      medium_cover_image
      isLiked @client
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo 2021</Title>
        <SubTitle>I love Moon</SubTitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}

      <Movies>
        {data?.movies?.map((m) => (
          <Movie
            key={m.id}
            id={m.id}
            isLiked={m.isLiked}
            bg={m.medium_cover_image && m.medium_cover_image}
          />
        ))}
      </Movies>
    </Container>
  );
};
export default Home;
