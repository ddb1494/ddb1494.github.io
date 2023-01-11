import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
const DeferredValue_ = lazy(() => import('./DeferredValue'));

const Page = () => {
  return <Suspense fallback={<>Loading...</>}>
    <DeferredValue_ />
    <Box px={8} pb={2}>{`const Item = lazy(() => import('./Item'))`}</Box>
    <Box px={8} pb={2}>{`<Suspense fallback={<>Loading...</>}><Item /> </Suspense>`}</Box>
  </Suspense>;
};

export default Page;