from ..MainGraph.Graphing import AgentState

import whisper




model = whisper.load_model("large")


def voice_node(state: AgentState):

    audio_path = state["input_prompt"]

    result = model.transcribe(audio_path)

    state["output_prompt"] = result["text"]

    return state