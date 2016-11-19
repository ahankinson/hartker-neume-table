import os
import json

# http://www.e-codices.unifr.ch/loris/csg/csg-0390/csg-0390_006.jp2/0,6144,2048,2032/256,254/0/default.jpg
IMAGE_TEMPLATE = "http://www.e-codices.unifr.ch/loris/csg/csg-0390/{page}.jp2/{x},{y},{w},{h}/64,/0/default.jpg"


def main():
    folders = os.listdir('annotations')

    out = {}

    for folder in folders:
        if folder.startswith("."):
            continue

        jsonp = os.path.join('annotations', folder, 'list.json')
        with open(jsonp, 'r') as jsonf:
            j = json.loads(jsonf.read())

            for annot in j:
                xywh = annot['on'].split("#")[-1].split("=")[-1]
                x, y, w, h = xywh.split(",")
                url = IMAGE_TEMPLATE.format(page=folder, x=x, y=y, w=w, h=h)
                label = annot['resource']['chars']

                if label not in out:
                    out[label] = []

                out[label].append(url)

    out2 = []
    for k, v in out.iteritems():
        if k.startswith("_"):
            continue
        out2.append({
            "type": k,
            "urls": v
        })

    out3 = sorted(out2, key=lambda k: k["type"])

    f = open('annotations.json', 'w')
    f.write(json.dumps(out3))
    f.close()
    print("Done!")


if __name__ == "__main__":
    main()
