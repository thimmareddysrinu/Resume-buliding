  

from langchain_ollama import ChatOllama

from ..MainGraph.Graphing import AgentState
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage,BaseMessage





llm=ChatOllama(model="llama3.2", temperature=0)



def create_resume(state:AgentState):
    details=state["input_prompt"]

   
    resume_prompt = f"""
    Generate ATS-friendly resume based on: "{details}"
    
    Follow this structure EXACTLY:
    1. Name, Email, Phone
    2. Professional Summary (3-4 lines)
    3. Skills (8-12 bullet points)
    4. Experience (3 roles, 4 bullets each)
    5. Education (2 degrees)
    6. Projects (3 projects)
    7. Hobbies
    
    If details missing, create realistic fake data.
    
    Format as plain text (no tables, ATS compatible).
    """
    response=llm.invoke(resume_prompt)
    state["output_prompt"]=response.content
    return state

