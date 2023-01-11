from flask import Flask, jsonify, redirect, Response, request
from flask_cors import CORS

api = Flask(__name__)
CORS(api)


@api.route("/diagnoses/<id>/", methods=["GET"])
def getDiagnosis(id):
    if id == "1":
        data = {
            "id": 1,
            "xray_type": 0,
            "xray_location": 16,
            "xray_file": "3.png",
            "xray_height": 1280,
            "xray_width": 1280,
            "pixel_conversion": 0.7,
            "bonelevel_ready": False,
            "colorization_ready": True,
            "detection_ready": True,
            "enable_bonelevel": False,
            "view": {
                "drawing": {},
                "angles": [],
                "boxes": [
                    {
                        "x": 5.0,
                        "y": 5.0,
                        "width": 50.0,
                        "height": 500.0,
                        "confidence": 0.5,
                        "class": 0,
                        "severity": 0,
                        "tooth_number": 0,
                        "distal": 0,
                        "buccal": 0,
                        "mesial": 0,
                        "occlusal": 1,
                        "treatments": [],
                    },
                    {
                        "x": 130.0,
                        "y": 150.0,
                        "width": 200.0,
                        "height": 50.0,
                        "confidence": 0.7,
                        "class": 1,
                        "severity": 1,
                        "tooth_number": 16,
                        "distal": 2,
                        "buccal": 2,
                        "mesial": 2,
                        "occlusal": 2,
                        "treatments": [],
                    },
                ],
                "measurements": [
                    {"x1": 5.0, "x2": 5.0, "y1": 5.0, "y2": 5.0, "length": 5.0},
                    {"x1": 1.0, "x2": 2.0, "y1": 3.0, "y2": 4.0, "length": 5.0},
                ],
                "teeth": [
                    {
                        "number": 36,
                        "x": 115,
                        "y": 16,
                        "width": 572,
                        "height": 1018,
                        "confidence": 0.93,
                    },
                    {
                        "number": 37,
                        "x": 653,
                        "y": 126,
                        "width": 594,
                        "height": 1032,
                        "confidence": 0.92,
                    },
                    {
                        "number": 37,
                        "x": 1217,
                        "y": 80,
                        "width": 539,
                        "height": 997,
                        "confidence": 0.87,
                    },
                ],
                "bone_levels": [],
                "inverted": False,
                "rotation": 0,
                "zoom": 0.0,
                "x": 0.0,
                "y": 0.0,
                "brightness": 0.0,
                "contrast": 0.0,
                "sharpness": 0.0,
            },
            "customer": {
                "name": "test-customer",
            },
            "inventories": [
                {
                    "name": "Crown",
                    "price": "100.00",
                    "category": "Dental",
                    "active": True,
                },
                {
                    "name": "Filling",
                    "price": "50.00",
                    "category": "Dental",
                    "active": True,
                },
            ],
            "patient": {
                "first_name": "test",
                "last_name": "patient",
                "patient_id": "",
                "reference_number": "",
                "email": "",
                "phone_number": "",
                "birthday": "",
                "gum_health": 0,
                "teeth_health": 0,
            },
        }

        return jsonify(data)

    if id == "2":
        data = {
            "id": 2,
            "xray_type": 0,
            "xray_location": 16,
            "xray_file": "3.png",
            "xray_height": 1452,
            "xray_width": 1964,
            "pixel_conversion": 0.7,
            "bonelevel_ready": True,
            "colorization_ready": True,
            "detection_ready": True,
            "enable_bonelevel": True,
            "view": {
                "drawing": {},
                "angles": [],
                "boxes": [
                    {
                        "x": 20.0,
                        "y": 20.0,
                        "width": 500.0,
                        "height": 70.0,
                        "confidence": 0.5,
                        "class": 0,
                        "severity": 0,
                        "tooth_number": 0,
                        "distal": 1,
                        "buccal": 1,
                        "mesial": 0,
                        "occlusal": 0,
                        "treatments": [
                            {
                                "artificial": True,
                                "inventory": None,
                                "status": "Not Started",
                            },
                            {
                                "artificial": False,
                                "inventory": 1,
                                "status": "In Progress",
                            },
                        ],
                    },
                    {
                        "x": 130.0,
                        "y": 200.0,
                        "width": 20.0,
                        "height": 50.0,
                        "confidence": 0.7,
                        "class": 1,
                        "severity": 1,
                        "tooth_number": 16,
                        "distal": 2,
                        "buccal": 2,
                        "mesial": 2,
                        "occlusal": 2,
                        "treatments": [
                            {
                                "artificial": True,
                                "inventory": 1,
                                "status": "Not Started",
                            },
                            {
                                "artificial": False,
                                "inventory": 2,
                                "status": "Not Started",
                            },
                        ],
                    },
                ],
                "measurements": [
                    {"x1": 5.0, "x2": 5.0, "y1": 5.0, "y2": 5.0, "length": 5.0},
                    {"x1": 1.0, "x2": 2.0, "y1": 3.0, "y2": 4.0, "length": 5.0},
                ],
                "teeth": [
                    {
                        "number": 36,
                        "x": 115,
                        "y": 16,
                        "width": 572,
                        "height": 1018,
                        "confidence": 0.93,
                    },
                    {
                        "number": 37,
                        "x": 653,
                        "y": 126,
                        "width": 594,
                        "height": 1032,
                        "confidence": 0.92,
                    },
                    {
                        "number": 37,
                        "x": 1217,
                        "y": 80,
                        "width": 539,
                        "height": 997,
                        "confidence": 0.87,
                    },
                ],
                "bone_levels": [
                    {
                        "tooth_number": 36,
                        "tooth_surface": 0,
                        "x1": 624.0,
                        "x2": 573.33,
                        "y1": 548.0,
                        "y2": 444.0,
                    },
                    {
                        "tooth_number": 36,
                        "tooth_surface": 1,
                        "x1": 166.666,
                        "x2": 144.0,
                        "y1": 434.67,
                        "y2": 301.33,
                    },
                    {
                        "tooth_number": 37,
                        "tooth_surface": 0,
                        "x1": 724.0,
                        "x2": 762.66,
                        "y1": 512.0,
                        "y2": 628.0,
                    },
                    {
                        "tooth_number": 37,
                        "tooth_surface": 1,
                        "x1": 1186.67,
                        "x2": 1158.67,
                        "y1": 461.33,
                        "y2": 646.66,
                    },
                    {
                        "tooth_number": 38,
                        "tooth_surface": 1,
                        "x1": 1689.33,
                        "x2": 1685.33,
                        "y1": 462.67,
                        "y2": 544.0,
                    },
                    {
                        "tooth_number": 38,
                        "tooth_surface": 0,
                        "x1": 1256.0,
                        "x2": 1252.0,
                        "y1": 445.33,
                        "y2": 629.33,
                    },
                ],
                "inverted": False,
                "rotation": 0,
                "zoom": 5.0,
                "x": 5.0,
                "y": 5.0,
                "brightness": 5.0,
                "contrast": 5.0,
                "sharpness": 5.0,
            },
            "customer": {
                "name": "test-customer",
            },
            "inventories": [
                {
                    "id": 1,
                    "name": "Crown",
                    "price": "100.00",
                    "category": "Dental",
                    "active": True,
                },
                {
                    "id": 2,
                    "name": "Filling",
                    "price": "50.00",
                    "category": "Dental",
                    "active": True,
                },
            ],
            "patient": {
                "first_name": "test",
                "last_name": "patient",
                "patient_id": "50630",
                "reference_number": "S1000039A",
                "email": "test@test.com",
                "phone_number": 12132145,
                "birthday": "2022-12-05",
                "gum_health": 0,
                "teeth_health": 3,
            },
        }
        return jsonify(data)


@api.route("/search/", methods=["GET"])
def searchPatients():
    diagnosis = {
        "id": 1,
        "xray_url": "http://localhost:3000/images/1/74a71a495564b416e9249f4a581544ba90b30f20642f10207c883a1ce4d722c4",
        "enhanced_url": "http://localhost:3000/images/1/74a71a495564b416e9249f4a581544ba90b30f20642f10207c883a1ce4d722c4_enhanced",
        "thumbnail_xray_url": "http://localhost:3000/images/1/74a71a495564b416e9249f4a581544ba90b30f20642f10207c883a1ce4d722c4_thumbnail",
        "created_at": "2022-08-02 09:23:52.541201",
        "rotation": 0,
    }
    args = request.args
    q = args.get("q")
    if q == "test":
        return jsonify([diagnosis])

    diagnosis2 = {
        "id": 2,
        "xray_url": "http://localhost:3000/images/2/35314563eb3f24b4535da14fbe02afda32e270a2990eb3559386b915c5146a2d",
        "enhanced_url": "http://localhost:3000/images/2/35314563eb3f24b4535da14fbe02afda32e270a2990eb3559386b915c5146a2d_enhanced",
        "thumbnail_xray_url": "http://localhost:3000/images/2/35314563eb3f24b4535da14fbe02afda32e270a2990eb3559386b915c5146a2d_thumbnail",
        "created_at": "2022-08-02 09:23:52.541201",
        "rotation": 0,
    }
    return jsonify([diagnosis, diagnosis2])


@api.route("/diagnoses/<id>/colorized/", methods=["GET"])
def colorizedXray(id):
    if id == "1":
        return redirect(
            "http://localhost:3000/images/1/eb6d019e8b9efa8db12ea6ec6cc52ad0e393eb19a0bbfb609037ca1a0610554c_colorized",
            code=302,
        )
    if id == "2":
        return redirect(
            "http://localhost:3000/images/2/040a8c4298def2b71a501335dd3ae879a114f7249337488d1dbd39ebf5c1145a_colorized",
            code=302,
        )


@api.route("/diagnoses/<id>/sharpen/", methods=["GET"])
def sharpenXray(id):
    if id == "1":
        return redirect(
            "http://localhost:3000/images/1/74a71a495564b416e9249f4a581544ba90b30f20642f10207c883a1ce4d722c4_sharpened_0",
            code=302,
        )
    if id == "2":
        return redirect(
            "http://localhost:3000/images/2/35314563eb3f24b4535da14fbe02afda32e270a2990eb3559386b915c5146a2d_sharpened_0",
            code=302,
        )


@api.route("/diagnoses/<id>/view/", methods=["PUT"])
def upsertView(id):
    return Response(status=200)


@api.route("/diagnoses/<id>/xray/", methods=["GET"])
def signedXray(id):
    if id == "1":
        return redirect(
            "http://localhost:3000/images/1/74a71a495564b416e9249f4a581544ba90b30f20642f10207c883a1ce4d722c4",
            code=302,
        )
    if id == "2":
        return redirect(
            "http://localhost:3000/images/2/35314563eb3f24b4535da14fbe02afda32e270a2990eb3559386b915c5146a2d",
            code=302,
        )


@api.route("/token/", methods=["POST"])
def validateToken():
    data = {"customer": "test-customer", "cms": 1, "confidence_threshold": 0}
    return jsonify(data)


@api.route("/xray/", methods=["GET"])
def xray():
    return Response(status=200)


@api.route("/password/", methods=["POST"])
def change_password():
    q = request.json["current_password"]
    if q == "test-password":
        return Response(status=200)
    return Response(status=401)


@api.route("/diagnoses/<id>/patient/", methods=["PUT"])
def change_patient_info(id):
    return Response(status=200)


@api.route("/patient/", methods=["GET"])
def get_patient_info():
    response = {
        "name": "Eric Mak",
        "reference_number": "3243242-hou",
        "patient_id": 12312313,
        "email": "email@email.com",
        "phone_number": 12342523,
    }

    return jsonify(response)


@api.route("/diagnoses/<id>/exports/dental_charting/", methods=["POST"])
def export_dental(id):
    if id == "2":
        return Response(status=200)
    return Response(status=401)


@api.route("/diagnoses/<id>/exports/perio_charting/", methods=["POST"])
def export_perio(id):
    if id == "2":
        return Response(status=200)
    return Response(status=401)


@api.route("/diagnoses/<id>/exports/send-email/", methods=["POST"])
def share_pdf_email(id):
    return Response(status=200)


@api.route("/diagnoses/<id>/exports/send-sms/", methods=["POST"])
def share_pdf_sms(id):
    return Response(status=200)
