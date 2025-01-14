from python_on_whales import docker, DockerClient
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("composefile", help="Compose file path")
args = parser.parse_args()

compose_file_path = args.composefile

print(compose_file_path)

# docker = DockerClient(compose_files=[compose_file_path])

# docker.compose.build()
# output = docker.compose.up()
# print(output)