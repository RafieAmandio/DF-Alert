# DF-ALERT: Diabetic Foot Advanced Learning and Early Risk Tracking 🦶🔍

## 🌟 Overview
DF-ALERT is an innovative mobile application designed to detect diabetic foot complications early using thermal imaging and 3D scanning technologies. The system utilizes machine learning algorithms to identify four major diabetic foot complications before they reach critical stages, potentially preventing limb-threatening conditions that affect millions of diabetic patients worldwide.

---

## 🚨 Problem Statement
- 537 million adults globally had diabetes in 2021, projected to reach 783 million by 2045 📈
- Each diabetic patient has a 25% lifetime risk of developing a diabetic foot ulcer (DFU) ⚠️
- Decreased quality of life and excess healthcare costs ($9-13 billion USD in the US alone) 💰
- 49% adherence to appropriate footwear and >50% of patients have poor/moderate knowledge of foot care 👟
- 34-49% of peripheral artery disease (PAD) cases remain undiagnosed 🩸

---

## 🔬 Technical Solution
DF-ALERT leverages a combination of thermal imaging, RGB camera data, and 3D scanning techniques processed through advanced machine learning algorithms to detect:

1. **Loss of Protective Sensation (LOPS)/Neuropathy** 🧠
   - Detection method: Thermal Recovery Index (TRI) and Interdigital Anisothermal analysis
   - Technical implementation: Before/after cold stress test thermal imaging with ML analysis
   - Reported sensitivity: 75.0-81.3%, specificity: 23.1-46.2%

2. **Peripheral Artery Disease (PAD)** 🩸
   - Detection method: Thermographic analysis to identify temperature decreases in affected areas
   - Technical implementation: Thermal scanning with machine learning classification
   - Reported accuracy: 96.8%

3. **Foot Deformity** 👣
   - Detection method: 3D scanning using smartphone RGB camera
   - Technical implementation: Photogrammetry (Android) or LIDAR (iOS) analysis via ML
   - Reported sensitivity: 75.7-96.0%, specificity: 77.0-88.2%, accuracy: 84.5%

4. **Ulcers/Pre-ulcerative Lesions** 🔴
   - Detection method: Combined RGB and thermal imaging
   - Technical implementation: Machine learning analysis (GoogleNet CNN and others)
   - RGB camera analysis - sensitivity: 91.2%, specificity: 94.9%, accuracy: 90.7%
   - Thermal imaging analysis - sensitivity: 91.8%, specificity: 98.4%, accuracy: 91.1%

## 🧠 Machine Learning Architecture
![image](https://github.com/user-attachments/assets/9337f316-9e80-4878-a7a4-f23edb3ffc9b)

The DF-ALERT system employs a sophisticated ML pipeline:
1. **Data Acquisition**: Multi-view 3D scanning of feet using smartphone camera 📱
2. **Point Cloud Generation**: Creation of detailed 3D point cloud representations ☁️
3. **Feature Extraction**: Using PointNet++ to extract hierarchical features 🔍
4. **Embedding**: Multi-level feature embedding from point cloud data 🔄
5. **Feature Aggregation**: GraphConv network implementation to establish relationships between features 🕸️
6. **Classification**: Output of detected complications with likelihood scores 📊

The architecture is based on established research:
- PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space (Charles R. Qi et al. 2017)
- Pointview-GCN: 3D Shape Classification With Multi-View Point Clouds (Mohammadi et al. 2021)
- Multi-view semantic learning network for point cloud based 3D object detection (Yang Yongguang et al. 2020)

## 💻 Technical Implementation

### 🔄 User Flow
![image](https://github.com/user-attachments/assets/40f47fcf-63b8-4628-b8bb-c90c7a9fdaf0)

1. **Onboarding**: Connect smartphone with FLIR thermal camera attachment 📱
2. **Scanning**: Capture 3D RGB and thermal data in a rotating manner 🔄
3. **Processing**: ML analysis of captured data to detect potential health issues ⚙️
4. **Results**: Review scan results and personalized recommendations 📋

### 🛠️ Hardware Requirements
- Smartphone: Android or iOS device 📱
- Thermal Camera: Compatible options include FLIR ONE Gen 3, Fluke iSee, HikMikro, or UNI-T 🔥
- 3D Data Capture: Using photogrammetry (Android) or LIDAR (iOS) 📐

### 🏥 Integration with Healthcare Systems
![image](https://github.com/user-attachments/assets/a81cbf43-73d9-4750-8adf-bfaed4df75d4)

DF-ALERT is designed to supplement the current diabetic foot management pathway by:
1. Providing monthly at-home screening before clinical visits 🏠
2. Directing patients to healthcare facilities when potential issues are detected 🚑
3. Connecting patients with diabetic shoe manufacturers when appropriate 👟
4. Providing educational content based on detected conditions 📚

## 📊 Model Implementation Details

### 🧠 LOPS Detection Model
```python
def lops_detection(thermal_before, thermal_after):
    """
    Detect Loss of Protective Sensation using thermal images before and after cold stress test.
    
    Args:
        thermal_before: Thermal image before cold stress test
        thermal_after: Thermal image after cold stress test
        
    Returns:
        dict: Detection results with likelihood scores
    """
    # Calculate Thermal Recovery Index (TRI)
    tri_values = calculate_tri(thermal_before, thermal_after)
    
    # Calculate Interdigital Anisothermal (ΔT)
    delta_t = calculate_anisothermal(thermal_after)
    
    # ML model prediction
    lops_detected = (tri_values < 90 or tri_values > 100 or delta_t > 0.4)
    
    return {
        "lops_detected": lops_detected,
        "tri_score": tri_values,
        "anisothermal_score": delta_t,
        "likelihood": calculate_likelihood(tri_values, delta_t)
    }
```

## 🩸 PAD Detection Model
```python
def pad_detection(rgb_image, thermal_image):
    """
    Detect Peripheral Artery Disease using RGB and thermal images.
    
    Args:
        rgb_image: Standard RGB image of foot
        thermal_image: Thermal image of foot
        
    Returns:
        dict: Detection results with likelihood scores
    """
    # Extract features from thermal image
    thermal_features = extract_thermal_features(thermal_image)
    
    # Detect temperature decreases in key areas
    temperature_map = generate_temperature_map(thermal_features)
    
    # ML prediction using CNN
    pad_prediction = pad_classifier.predict(temperature_map)
    
    return {
        "pad_detected": pad_prediction > 0.5,
        "likelihood": pad_prediction,
        "affected_areas": identify_affected_areas(temperature_map)
    }
```

## 📊 3D Point Cloud Processing
```python
def process_point_cloud(multi_view_images):
    """
    Process multiple view images into a 3D point cloud.
    
    Args:
        multi_view_images: List of images from different angles
        
    Returns:
        point_cloud: 3D point cloud data
    """
    # Generate point cloud from multi-view images
    if platform == "android":
        point_cloud = photogrammetry_reconstruction(multi_view_images)
    else:  # iOS
        point_cloud = lidar_reconstruction(multi_view_images)
    
    # Normalize and preprocess point cloud
    processed_cloud = preprocess_point_cloud(point_cloud)
    
    return processed_cloud
```

## 🏗️ Model Architecture

### 🔷 PointNet++ Implementation
```python
class PointNetPlusPlus(nn.Module):
    def __init__(self, num_classes=4):
        super(PointNetPlusPlus, self).__init__()
        self.sa1 = PointNetSetAbstraction(
            npoint=512, radius=0.2, nsample=32,
            in_channel=3, mlp=[64, 64, 128], group_all=False
        )
        self.sa2 = PointNetSetAbstraction(
            npoint=128, radius=0.4, nsample=64,
            in_channel=128 + 3, mlp=[128, 128, 256], group_all=False
        )
        self.sa3 = PointNetSetAbstraction(
            npoint=None, radius=None, nsample=None,
            in_channel=256 + 3, mlp=[256, 512, 1024], group_all=True
        )
        self.fc1 = nn.Linear(1024, 512)
        self.bn1 = nn.BatchNorm1d(512)
        self.drop1 = nn.Dropout(0.4)
        self.fc2 = nn.Linear(512, 256)
        self.bn2 = nn.BatchNorm1d(256)
        self.drop2 = nn.Dropout(0.4)
        self.fc3 = nn.Linear(256, num_classes)

    def forward(self, xyz):
        B, _, _ = xyz.shape
        norm = None
        l1_xyz, l1_points = self.sa1(xyz, norm)
        l2_xyz, l2_points = self.sa2(l1_xyz, l1_points)
        l3_xyz, l3_points = self.sa3(l2_xyz, l2_points)
        
        x = l3_points.view(B, 1024)
        x = self.drop1(F.relu(self.bn1(self.fc1(x))))
        x = self.drop2(F.relu(self.bn2(self.fc2(x))))
        x = self.fc3(x)
        
        return x
```

## 🕸️ GraphConv Feature Aggregation
```python
class GraphConvFeatureAggregation(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(GraphConvFeatureAggregation, self).__init__()
        self.conv1 = GCNConv(in_channels, 256)
        self.conv2 = GCNConv(256, 128)
        self.conv3 = GCNConv(128, out_channels)
        self.dropout = nn.Dropout(0.3)
        
    def forward(self, x, edge_index):
        # First Graph Conv layer
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.dropout(x)
        
        # Second Graph Conv layer
        x = self.conv2(x, edge_index)
        x = F.relu(x)
        x = self.dropout(x)
        
        # Third Graph Conv layer
        x = self.conv3(x, edge_index)
        
        return x
```

## 🏆 Competitive Advantages
Compared to existing solutions like Podimetrics SmartMat and Footsnap:
- More comprehensive detection capabilities (covers all 4 major complications) ✅
- Uses IWGDF-defined risk classification standards 📋
- Provides patient education and footwear access integration 📚
- More affordable ($200 for FLIR ONE camera vs. $500 for Podimetrics) 💰
- Highly portable smartphone-based solution 📱

## 💼 Business Model
Two primary business approaches:
1. **B2B Subscription Model** 🔄:
   - 6-month or annual subscription options for healthcare providers
   - API support for integration with existing healthcare systems

2. **White-Label Solution** 🏷️:
   - Licensing for telemedicine companies, healthcare institutions, and medical footwear manufacturers
   - Customization and rebranding options
   - Updates and lifetime support included
  

## 📚 References
The technical approach is grounded in published research, including:
1. Balbinot L, et al. (2012) - Plantar thermography for diabetic neuropathy diagnosis 🔍
2. Goyal M, et al. (2020) - CNN for diabetic foot ulcer classification 🖼️
3. Khosa I, et al. (2023) - Automatic DFU recognition using thermographic image data 🔥
4. Kostadinov G. (2023) - AI-enabled infrared thermography for PAD detection 🩸
5. Lebedev A, et al. (2024) - AI for hallux valgus assessment via mobile 3D scanning 📱
