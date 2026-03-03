
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage,BaseMessage
from typing import TypedDict,Literal,List



class AgentState(TypedDict):
    input_type:Literal['baseUser','imagegenerate','voicetotext','translator',"resume_builder"]
    converstion_history:List[BaseMessage]
    input_prompt:str
    output_prompt:str


def base_router(state: AgentState):

    input_type = state["input_type"]

    if input_type == "resume_builder":
        return "resume_node"

    elif input_type == "imagegenerate":
        return "image_node"

    elif input_type == "voicetotext":
        return "voice_node"

    elif input_type == "translator":
        return "translator_node"

    else:
        return "base_node" 
