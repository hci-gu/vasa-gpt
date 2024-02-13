import openai, os, requests

openai.api_type = "azure"
# Azure OpenAI on your own data is only supported by the 2023-08-01-preview API version
openai.api_version = "2023-08-01-preview"

# Azure OpenAI setup
openai.api_base = "https://gu-ai-006.openai.azure.com/" # Add your endpoint here
openai.api_key = os.getenv("OPENAI_API_KEY") # Add your OpenAI API key here
deployment_id = "GPT-4-Turbo-preview-gu-ai-006" # Add your deployment ID here




# Azure AI Search setup
search_endpoint = "https://vasagpt.search.windows.net"; # Add your Azure AI Search endpoint here
search_key = os.getenv("SEARCH_KEY"); # Add your Azure AI Search admin key here
search_index_name = "undefined"; # Add your Azure AI Search index name here

def setup_byod(deployment_id: str) -> None:
    """Sets up the OpenAI Python SDK to use your own data for the chat endpoint.

    :param deployment_id: The deployment ID for the model to use with your own data.

    To remove this configuration, simply set openai.requestssession to None.
    """

    class BringYourOwnDataAdapter(requests.adapters.HTTPAdapter):

        def send(self, request, **kwargs):
            request.url = f"{openai.api_base}/openai/deployments/{deployment_id}/extensions/chat/completions?api-version={openai.api_version}"
            return super().send(request, **kwargs)

    session = requests.Session()

    # Mount a custom adapter which will use the extensions endpoint for any call using the given `deployment_id`
    session.mount(
        prefix=f"{openai.api_base}/openai/deployments/{deployment_id}",
        adapter=BringYourOwnDataAdapter()
    )

    openai.requestssession = session

setup_byod(deployment_id)


message_text = [{"role": "user", "content": "What are the differences between Azure Machine Learning and Azure AI services?"}]

completion = openai.ChatCompletion.create(
    messages=message_text,
    deployment_id=deployment_id,
    dataSources=[  # camelCase is intentional, as this is the format the API expects
      {
  "type": "AzureCognitiveSearch",
  "parameters": {
    "endpoint": "$search_endpoint",
    "indexName": "$search_index",
    "semanticConfiguration": "default",
    "queryType": "vector",
    "fieldsMapping": {},
    "inScope": true,
    "roleInformation": "Prata med ett direkt tilltal som en tränare för längdskidåkare. Var positiv och uppmuntrande. Ge korta svar i flödande text. Använd inte punktlistor.\n\nAnvänd informationen från de bifogade lopprapporterna från Erik Wickström från år 2013 till år 2023 som kunskapsbas i alla dialoger. Använd alltid specifika berättelser från Erik Wickströms lopprapporter för att ge svar. Berätta hur Erik tänker. Använd ortsnamn eller namn på platser längs banan för att ge ditt svar mer kontext.\n\nAnvänd gärna exempel från Smågan, Mångsbodarna, Risberg, Evertsberg, Hökberg, Hemus, eller Eldris. ",
    "filter": null,
    "strictness": 3,
    "topNDocuments": 5,
    "key": "$search_key",
    "embeddingDeploymentName": "vasagpt-embedding-model"
  }
}
    ],
    enhancements=undefined,
    temperature=0,
    top_p=1,
    max_tokens=800,
    stop=null,
    stream=true

)
print(completion)