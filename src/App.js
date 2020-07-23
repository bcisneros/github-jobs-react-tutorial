import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./components/Job";
import JobPagination from "./components/JobPagination";
import SearchForm from "./components/SearchForm";

export default function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, isLastPage } = useFetchJobs(params, page);

  const handleParamChange = e => {
    const { name, value } = e.target;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [name]: value };
    });
  };
  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />;
      })}
      <JobPagination page={page} setPage={setPage} isLastPage={isLastPage} />
    </Container>
  );
}
