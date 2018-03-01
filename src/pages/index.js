import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => {
  const resumes = data.allDataJson.edges;
  const resume = resumes.find(r => r.node.language === "zh");
  const { basics, education, languages, skills, volunteer, work } = resume.node;
  return (
    <div>
      <h1>{basics.name}</h1>
      <h2>{basics.label}</h2>
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query jsonQuery {
    allDataJson {
      edges {
        node {
          language
          basics {
            name
            label
            email
            phone
            website
            summary
            location {
              city
            }
            profiles {
              network
              username
              url
            }
          }
          work {
            company
            position
            website
            startDate
            endDate
            summary
            highlights
          }
          volunteer {
            organization
            position
            website
            startDate
            endDate
            summary
            highlights
          }
          education {
            institution
            area
            studyType
            startDate
            endDate
          }
          skills {
            name
            level
            keywords
          }
          languages {
            language
            fluency
          }
        }
      }
    }
  }
`;
