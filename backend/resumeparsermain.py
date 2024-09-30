import httpx
import time
import json
from groq import Groq, APIConnectionError

client = Groq(
    api_key="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"
)

def parserfn(message):
    result = ''
    max_retries = 3
    for attempt in range(max_retries):
        try:
            completion = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI bot designed to act as a professional for parsing resumes. You are given with resume and your job is to extract the following information from the resume:\\n    and return in the same json{'Name': '', 'Email':'', 'PhoneNumber': '', 'Location': '', 'GitHub': '', 'LinkedIn': '', 'CareerObjective': '', 'Education': [{'Institution': '', 'Year': '', 'Degree': '', 'Results': ''}], 'Projects': [{'ProjectName': '', 'Description': ''}, {'ProjectName': '', 'Description': ''}, {'ProjectName': '', 'Description': ''}], 'ProgrammingLanguages': [], 'WebTechnologies': [], 'ToolsandFrameworks': [], 'Databases': [], 'OtherSkills': [],'AreasOfInterest':[] ,'Hobbies': [], 'Achievements':{}, 'Experience': [{'Position': '', 'Company': '', 'Location': '', 'Dates': '', 'Description': ''}], 'CareerLevel': '','Certifications':[],'LeadershipQualities':[]} Classify it in 4: Fresher who have no experience, Beginner who have 1 to 3 years of experience, Mid level who have 3 to 10 years of experience, and Senior level people who have more than 10 years of experience. Calculate experience from all work experience and give only the level without years, which does not cut the career.If paper presented mentioned do not add them in projects .If skills are given, classify the skills according to the given fields. If paper presentation are given, fetch them correctly and add into Achievements dont add key like 'paperpresentations'. If any courses or certificates are mentioned, add them to certifications..If the information is not present ignore it and under any circumstances do not use any fake information or dummy information and only give the json formatted data as it will be used for  json decoding purposes in order to avoid syntax errors\nDont give any insights or \"here is the extracted information in JSON format\" or something like this\n and dont add any commas,double quotes,single quotes if it contains extra commas or double quotes or single quotes remove them and give corrected json format"
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
                temperature=1,
                max_tokens=1024,
                top_p=1,
                stream=True,
                stop=None,
            )
            for chunk in completion:
                result += chunk.choices[0].delta.content or ""
            break  # Exit the retry loop if successful
        except httpx.RemoteProtocolError as err:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise APIConnectionError(request=message) from err
        except httpx.RequestError as err:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise APIConnectionError(request=message) from err

    result = result.strip()
    result = result.replace("Here is the extracted information in JSON format:", "")
    print("Generated result:", result)
    try:
        result = result.replace("'", '"')
        result = result.replace('}"{', '}, {')
        result = result.replace('] [', '],[')
        result = result.replace('""', '","')
        result = result.replace("I'm", "I am")
        result = result.replace("I\"m", "I am")
        print("Result after replacing single quotes and fixing formatting:", result)
        json_data = json.loads(result)
        return json.dumps(json_data, indent=4) 
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        error_position = e.pos if e.pos is not None else 0
        print("Problematic JSON segment:", result[max(0, error_position-100):error_position+100])
        return result
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return result