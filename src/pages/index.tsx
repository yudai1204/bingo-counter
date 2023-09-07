import { Box, Button, Flex, Text, Container, Center } from "@chakra-ui/react";
import { useState } from "react";

let interval: NodeJS.Timeout;

const generateRandomNumber = (used: number[], setCount: any) => {
  const random = Math.floor(Math.random() * 75 + 1);
  if (used.includes(random)) {
    generateRandomNumber(used, setCount);
  } else {
    setCount(random);
  }
};

const generateRandomNumber2 = (used: number[]): any => {
  const answer = Math.floor(Math.random() * 75 + 1);
  if (used.includes(answer)) {
    return generateRandomNumber2(used);
  } else {
    return answer;
  }
};

const SButton = (props: any) => {
  const [canPush, setCanPush] = useState(true);
  const { isCount, onClick, usedList, setUsedList, setCount, setLast, count } =
    props;
  return (
    <Button
      colorScheme={(isCount && "whatsapp") || "teal"}
      onClick={() => {
        if (isCount) {
          if (!canPush) return;
          setCanPush(false);
          //count stop
          const answer = generateRandomNumber2(usedList);
          clearInterval(interval);
          const stopCount = Math.random() * 3 + 2;
          let cnt = 0;
          const inter = setInterval(() => {
            cnt++;
            generateRandomNumber(usedList, setCount);
            if (cnt > stopCount) {
              clearInterval(inter);
              setTimeout(() => {
                setUsedList(
                  [...usedList, answer]
                    .filter((x) => x > 0)
                    .sort((a, b) => a - b)
                );
                onClick(false);
                setCanPush(true);
                setCount(answer);
              }, 300);
            }
          }, 300);
        } else {
          //count start
          setLast(count);
          onClick(true);
          interval = setInterval(() => {
            generateRandomNumber(usedList, setCount);
          }, 100);
        }
      }}
    >
      {isCount ? "ストップ！" : "スタート！"}
    </Button>
  );
};

export default function Home() {
  const [isCount, setIsCount] = useState(false);
  const [count, setCount] = useState(0);
  const [usedList, setUsedList] = useState([]);
  const [lastCount, setLastCount] = useState<number | undefined>(undefined);
  return (
    <Container mt="3vh">
      <Flex w="100%" mb="5vh">
        <Box w="15%" />
        <Text
          fontSize="max(18vh,18vw)"
          lineHeight="max(18vh,18vw)"
          fontWeight="bold"
          color={isCount ? "#bbb" : "black"}
          m="0 auto"
        >
          {count}
        </Text>
        <Box w="15%" position="relative">
          <Text
            fontSize="max(4vh,4vw)"
            color="#bbb"
            textAlign="right"
            mr=".5em"
            position="absolute"
            bottom=".2em"
            right="0"
          >
            {lastCount || ""}
          </Text>
        </Box>
      </Flex>
      <Center>
        <SButton
          isCount={isCount}
          count={count}
          onClick={setIsCount}
          setCount={setCount}
          usedList={usedList}
          setUsedList={setUsedList}
          setLast={setLastCount}
        />
      </Center>
      <Center>
        {usedList.length > 0 && (
          <Box>
            <Flex
              border="1px solid #ccc"
              p="max(3vh,3vw)"
              w="90vw"
              mt="8vh"
              borderRadius="1vw"
              flexWrap="wrap"
              gap="2vh"
            >
              {usedList.map((item) => (
                <Text fontSize="max(2.5vh,2.5vw)">{item}</Text>
              ))}
            </Flex>
            <Text color="#777" textAlign="right" mr=".5em" mt=".3em">
              {usedList.length} / 75
            </Text>
          </Box>
        )}
      </Center>
    </Container>
  );
}
