from ..MainGraph.Graphing import AgentState
from diffusers import StableDiffusionPipeline
import torch


pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5"
)

pipe.to("cuda" if torch.cuda.is_available() else "cpu")


def image_node(state: AgentState):

    prompt = state["input_prompt"]

    image = pipe(prompt).images[0]

    path = "media/generated.png"

    image.save(path)

    state["output_prompt"] = path

    return state