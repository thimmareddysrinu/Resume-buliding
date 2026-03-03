from ..MainGraph.Graphing import AgentState









from langchain_ollama import ChatOllama




llm=ChatOllama(model="llama3.2", temperature=0)

def base_node(state: AgentState):

    response = llm.invoke(state["input_prompt"])

    state["output_prompt"] = response.content

    return state