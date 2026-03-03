from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_name = "facebook/nllb-200-distilled-600M"

tokenizer = AutoTokenizer.from_pretrained(model_name)

model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


def translator_node(state):

    text = state["input_prompt"]

    inputs = tokenizer(
        text,
        return_tensors="pt"
    )

    translated = model.generate(
        **inputs,
        forced_bos_token_id=tokenizer.convert_tokens_to_ids("tel_Telu")
    )

    output = tokenizer.decode(
        translated[0],
        skip_special_tokens=True
    )

    state["output_prompt"] = output

    return state