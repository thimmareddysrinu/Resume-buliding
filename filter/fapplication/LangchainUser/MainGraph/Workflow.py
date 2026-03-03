from langgraph.graph import StateGraph,END,add_messages
from .Graphing import AgentState,base_router

from ..Agents.Resume import *
from ..Agents.BaeAgent import *
from ..Agents.Imagegen import *
from ..Agents.VoiceAgent import *
from ..Agents.Translator import *

def create_workflow():
    workflow = StateGraph(AgentState)
    
    # Add nodes (matching router returns)
    workflow.add_node("base_node", base_node)
    workflow.add_node("image_node", image_node)  # Assuming voice_to_text handles images?
    workflow.add_node("voice_node", voice_node)
    workflow.add_node("translator_node", translator_node)
    workflow.add_node("resume_node", create_resume)
    
    # Set conditional entry (uses base_router)
    workflow.set_conditional_entry_point(base_router)
    
    # Add edges FROM actual nodes TO END
    workflow.add_edge("base_node", END)
    workflow.add_edge("image_node", END)
    workflow.add_edge("voice_node", END)
    workflow.add_edge("translator_node", END)
    workflow.add_edge("resume_node", END)
    
    return workflow.compile()
